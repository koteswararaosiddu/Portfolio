import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/content/data";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-12 sm:py-16">
      <SectionHeading title="Projects" />
      <div className="grid max-w-xl gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-lg border border-ink-600 bg-ink-900/40 p-5 transition-colors hover:border-signal-500/40"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-500 text-mist-50">
                <a href={project.href} className="link-underline">
                  {project.title}
                </a>
              </h3>
              <a
                href={project.repo}
                aria-label={`View source for ${project.title}`}
                className="text-mist-400 hover:text-signal-400 transition-colors"
              >
                ⌥
              </a>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {project.stack.map((tech) => (
                <li key={tech} className="font-mono text-xs text-mist-400">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
