import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/content/data";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-16">
      <SectionHeading title="Skills" />

      <div className="
relative
overflow-hidden
rounded-2xl
border
border-cyan-400/50
bg-ink-900/30
p-5
shadow-[0_0_20px_rgba(34,211,238,0.25)]
transition-all
duration-300
animate-pulse
"
>
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h5 className="mb-4 font-display text-lg font-semibold text-mist-100">
              {group.title}: 
            </h5>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-ink-700 px-3 py-1 text-sm text-mist-300 transition hover:border-signal-400 hover:text-signal-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}