const partners = [
  { icon: "⬤", name: "Spotify" },
  { icon: "◼", name: "Microsoft" },
  { icon: "▲", name: "Google" },
  { icon: "▶", name: "YouTube" },
  { icon: "⬤", name: "Samsung" },
];

export default function Partners() {
  return (
    <div className="bg-dark border-t border-b border-border-dark">
      <div className="max-w-[1280px] mx-auto px-5 py-5 lg:px-12 lg:py-[26px] flex flex-wrap items-center justify-center lg:justify-between gap-4">
        {partners.map((p) => (
          <div
            key={p.name}
            className="text-[0.95rem] font-semibold text-white/20 tracking-wider"
          >
            {p.icon} {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
