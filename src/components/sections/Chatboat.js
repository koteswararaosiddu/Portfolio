"use client";

import { useEffect, useRef, useState } from "react";

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

// const sendMessage = async () => {
//   if (!message.trim()) return;

//   const userMessage = message;

//   // Show user message
//   setMessages((prev) => [
//     ...prev,
//     {
//       role: "user",
//       text: userMessage,
//     },
//   ]);

//   setMessage("");
//   setLoading(true);

//   try {
//     const response = await fetch(
//       "https://v8n.vyaktimetrics.com/webhook/portfolio-chat",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: userMessage,
//         }),
//       }
//     );

//     const data = await response.json() ;

// console.log("hiii", data[0]?.output);

// setMessages((prev) => [
//   ...prev,
//   {
//     role: "assistant",
//     text:
//     data[0]?.output ||
//       data.message ||
//       "No response received.",
//   },
// ]);
//   } catch (err) {
//     console.error(err);

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         text: "❌ Unable to connect to AI Assistant.",
//       },
//     ]);
//   }

//   setLoading(false);
// };
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
      "https://v8n.vyaktimetrics.com/webhook/portfolio-chat",
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

    console.log("Raw Response:");

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

    console.log("Parsed:", data);

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
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl text-black shadow-xl transition-all duration-300 hover:scale-110"
      >
        {open ? "✖" : "💬"}
      </button>

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
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
          msg.role === "user"
            ? "bg-cyan-400 text-black"
            : "bg-gray-800 text-white"
        }`}
      >
        {msg.text}
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