import SectionHeading from "@/components/SectionHeading";
import { writing, colophon } from "@/content/data";

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-20 py-12 sm:py-16">
      <SectionHeading title="Education" />
      <ul className="max-w-xl divide-y divide-ink-600">
        {writing.map((entry) => (
          <li key={entry.title} className="flex items-baseline gap-4 py-4">
            <span className="font-mono text-xs text-mist-400 whitespace-nowrap">
              {entry.year}
            </span>
            <span className="font-display text-sm font-500 text-mist-100">
              {entry.title}
            </span>
          </li>
        ))}
      </ul>

      <footer className="mt-20 max-w-xl border-t border-ink-700 pt-8 pb-4">
        <p className="font-mono text-xs leading-relaxed text-mist-400">
          {colophon.text}
        </p>
      </footer>
    </section>
  );
}
