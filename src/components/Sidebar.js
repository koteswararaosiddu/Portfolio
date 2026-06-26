import Image from "next/image";
import SideNav from "@/components/SideNav";
import { profile } from "@/content/data";

export default function Sidebar() {
  return (
    <header className="lg:fixed lg:flex lg:h-screen lg:w-[40%] lg:max-w-sidebar lg:flex-col lg:justify-between lg:py-20 px-6 sm:px-10 lg:px-0 lg:pl-12 pt-16 pb-10">
      <div>
        {/* Name */}
        <h4 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-mist-60">
          <a href="#" className="link-underline">
            {profile.name}
          </a>
        </h4>

        {/* Role */}
        <p className="mt-3 font-display text-lg sm:text-xl text-mist-100">
          {profile.role}
        </p>

        {/* Tagline */}
        <p className="mt-4 max-w-md text-base leading-relaxed text-mist-300">
          {profile.tagline}
        </p>

        {/* Location */}
        <p className="mt-4 font-mono text-xs text-mist-400">
          {profile.location}
        </p>

        {/* Navigation + Profile Image */}
        <div className="mt-12 hidden lg:flex items-start justify-between gap-10">
         

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="h-40 w-45 overflow-hidden rounded-full border border-ink-600">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
           {/* Navigation */}
           <div className="flex-1">
            <SideNav />
          </div>
        </div>

        {/* Mobile Image */}
        <div className="mt-10 flex justify-center lg:hidden">
          <div className="h-20 w-60 overflow-hidden rounded-br-full border border-ink-600">
            <Image
              src="/profile.jpg"
              alt={`Portrait of ${profile.name}`}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
  <div className="group flex items-center gap-2 transition-colors">
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-signal-400/30 bg-signal-400/10 text-xs text-signal-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-signal-400 group-hover:text-slate-900">
      ✉
    </span>
    <span className="font-mono text-xs text-mist-300 transition-colors group-hover:text-mist-50">
      {profile.email}
    </span>
  </div>

  <span className="text-mist-600">|</span>

  <div className="group flex items-center gap-2 transition-colors">
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-signal-400/30 bg-signal-400/10 text-xs text-signal-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-signal-400 group-hover:text-slate-900">
      📱
    </span>
    <span className="font-mono text-xs text-mist-300 transition-colors group-hover:text-mist-50">
      {profile.phone}
    </span>
  </div>
</div>
    </header>
  );
}