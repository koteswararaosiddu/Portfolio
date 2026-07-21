"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const [messages, setMessages] = useState([
  {
    role: "assistant",
    text: "👋 Hi! I'm Siddu's AI Assistant. Ask me anything.",
  },
]);
const messagesEndRef = useRef(null);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
    });
}, [messages]);



const sendMessage = async () => {
  if (!message.trim() || loading) return;

  const userMessage = message.trim();

  // Add user message
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: userMessage,
    },
  ]);

  setMessage("");
  setLoading(true);

  try {
    const response = await fetch(
      "https://flow.vyaktimetrics.com/webhook/portfolio-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Read as text first
    const responseText = await response.text();

    // console.log("Raw Response:",responseText);

    if (!responseText.trim()) {
      throw new Error("Empty response from server");
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      throw new Error("Invalid JSON returned");
    }

    // console.log("Parsed:", data);

    let botReply = "No response received.";

    if (Array.isArray(data)) {
      botReply =
        data[0]?.output ||
        data[0]?.message ||
        data[0]?.text ||
        botReply;
    } else {
      botReply =
        data.output ||
        data.message ||
        data.text ||
        botReply;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: botReply,
      },
    ]);
  } catch (err) {
    console.error("Chat Error:", err);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          "❌ Sorry! AI Assistant is temporarily unavailable. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-20 z-50 group">
  {/* Tooltip */}
  <div className="absolute bottom-20 right-0 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
    👋 Hi! I&apos;m <span className="font-semibold text-cyan-400">Siddu AI</span>
    <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-slate-900"></div>
  </div>

  {/* Button */}
  <button
    onClick={() => setOpen(!open)}
    className="h-14 w-14 rounded-full transition-transform duration-300 hover:scale-110"
  >
    <img
      src="/smooth pulsing.gif"
      alt="Siddu AI"
      className="h-full w-full rounded-full object-cover"
    />
  </button>
</div>

      {/* Chat Window */}
      {open && (
        <div
        className="
          fixed
          z-50
          bg-[#0f172a]
          border
          border-gray-700
          shadow-2xl
          overflow-hidden
          flex
          flex-col
      
          bottom-20
          right-4
      
          w-[calc(100vw-2rem)]
          h-[75vh]
      
          sm:w-[380px]
          sm:h-[550px]
      
          rounded-2xl
        "
      >

          {/* Header */}
          <div className="flex items-center justify-between bg-cyan-500 px-4 py-3">
            <div>
              <h2 className="font-semibold text-black">
                Siddu AI Assistant
              </h2>
              <p className="text-xs text-black/80">
                Ask me anything
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl text-black"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div className="flex gap-3">
  {msg.role === "assistant" && (
    <img
      src="/smooth pulsing.gif"
      alt="AI"
      className="h-10 w-10 rounded-full border border-cyan-400"
    />
  )}

  <div
    className={`rounded-2xl px-4 py-3 shadow-lg ${
      msg.role === "user"
        ? "bg-cyan-400 text-black ml-auto"
        : "bg-slate-800 text-white border border-slate-700"
    }`}
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mt-3 mb-2 text-cyan-400">
            {children}
          </h2>
        ),
        p: ({ children }) => (
          <p className="leading-7 mb-2">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-5 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 space-y-1">{children}</ol>
        ),
        strong: ({ children }) => (
          <strong className="text-cyan-300">{children}</strong>
        ),
        code({ inline, children }) {
          return inline ? (
            <code className="rounded bg-gray-900 px-1 py-0.5 text-cyan-300">
              {children}
            </code>
          ) : (
            <SyntaxHighlighter language="javascript">
              {String(children)}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {msg.text}
    </ReactMarkdown>

    {/* {msg.role === "assistant" && (
      <div className="mt-3 flex gap-4 text-xs text-gray-400">
        <button className="hover:text-cyan-400">👍</button>
        <button className="hover:text-cyan-400">👎</button>
        <button
          onClick={() => navigator.clipboard.writeText(msg.text)}
          className="hover:text-cyan-400"
        >
          📋 Copy
        </button>
      </div>
    )} */}
  </div>
</div>
    </div>
  ))}
  {loading && (
  <div className="flex justify-start">
    <div className="rounded-xl bg-gray-800 px-4 py-3 text-sm text-white">
      Typing...
    </div>
  </div>
)}
<div ref={messagesEndRef}></div>
</div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-3">
            <div className="flex gap-2">
                    <input
          type="text"
          value={message}
onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask Siddu..."
          className="flex-1 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-white outline-none"
        />

<button
  onClick={sendMessage}
  className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black hover:bg-cyan-300"
>
  Send
</button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
