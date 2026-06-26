"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/data";

export default function StatusLine() {
  const lines = profile.statusLines;
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = lines[index % lines.length];
    let timeout;

    if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 2200);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(display.slice(0, -1));
        }, 18);
      } else {
        setIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, index, lines]);

  return (
    <p
      className="font-mono text-sm text-mist-300"
      aria-live="off"
    >
      <span className="text-signal-500">$</span>{" "}
      <span className="text-mist-400">status --watch</span>{" "}
      <span className="text-mist-200">{display}</span>
      <span
        className="inline-block w-[7px] translate-y-[1px] bg-signal-400 animate-blink"
        style={{ height: "1em" }}
        aria-hidden="true"
      />
      <span className="sr-only">{lines[index % lines.length]}</span>
    </p>
  );
}
