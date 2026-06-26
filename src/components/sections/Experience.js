import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/content/data";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-12 sm:py-16">
      <SectionHeading  title="Experience" />
      <div className="max-w-2xl" >
        {experience.map((job, i) => (
          <div
            key={i}
            href={job.href}
            className="group -mx-3 grid grid-cols-1 gap-2 rounded-md px-3 py-4 transition-colors sm:grid-cols-[6.5rem_1fr] sm:gap-4 hover:bg-ink-900/60"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-mist-400 sm:pt-1">
              {job.period}
            </p>
            <div>
              <h3 className="font-display text-base font-500 text-mist-50">
                {job.title}{" "}
                <span className="text-mist-300">· {job.org}</span>
                <span className="ml-1 inline-block text-signal-400 opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {job.description}
              </p>
              {job.references?.length > 0 && (
  <div className="mt-4">
    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-mist-400">
      References
    </p>

    <div className="flex flex-wrap gap-3">
      {job.references.map((ref) => (
        <a
          key={ref.title}
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-3 py-1.5 text-xs text-signal-400 transition-all hover:border-signal-400 hover:bg-ink-900"
        >
          <span>{ref.title}</span>
          <span>↗</span>
        </a>
      ))}
    </div>
  </div>
)}
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs text-mist-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
