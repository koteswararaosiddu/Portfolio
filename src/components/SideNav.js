"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/data";

export default function SideNav() {
  const [active, setActive] = useState(nav[0].id);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Section navigation">
      <ul className="space-y-1">
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center gap-3 py-2"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive ? "w-10 bg-signal-400" : "w-4 bg-mist-400/60 group-hover:w-7 group-hover:bg-mist-200"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isActive
                      ? "text-mist-50"
                      : "text-mist-400 group-hover:text-mist-200"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
