import SectionHeading from "@/components/SectionHeading";
import { about } from "@/content/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-12 sm:py-16">
      <SectionHeading  title="About"  />
      <div  className="max-w-xl space-y-4 text-base leading-relaxed text-mist-300">
        {about.paragraphs.map((p, i) => (
          <p className="link-underline"key={i}>{p}</p>
        ))}
        <p className="link-underline">
         {about.hobbies}.
        </p>
      </div>
    </section>
  );
}
