export default function SectionHeading({ number, title }) {
  return (
    <div className="sticky top-0 z-10 -mx-1 mb-6 flex items-center gap-4 bg-ink-950/85 px-1 py-3 backdrop-blur-sm sm:static sm:bg-transparent sm:backdrop-blur-none">
      <span className="font-mono text-sm text-signal-400">{number}</span>
      <h2 className="font-display text-xl font-500 text-mist-50">{title}</h2>
      <span className="h-px flex-1 bg-ink-600" aria-hidden="true" />
    </div>
  );
}
