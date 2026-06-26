import Sidebar from "@/components/Sidebar";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Writing from "@/components/sections/Writing";
import ChatBot from "@/components/sections/Chatboat";

export default function Home() {
  return (
    <main className="bg-ink-950">
      <div className="mx-auto max-w-10xl lg:flex lg:gap-5">
        <Sidebar />
        <div className="lg:ml-[45%] lg:max-w-none flex-1 px-2 sm:px-4 lg:pl-0 lg:pr-12">
          <About />
          <Experience />
          <ChatBot/>
          <Skills />
          <Projects />
          <Writing />
        </div>
      </div>
    </main>
  );
}
