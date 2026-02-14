const quickLinks = [
  { label: "Accueil", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#" },
];

const company = [
  { label: "À Propos", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Carrières", href: "#" },
  { label: "Mentions Légales", href: "#" },
];

const office = [
  { label: "Aix-en-Provence", href: "#" },
  { label: "contact@agencehds.fr", href: "mailto:contact@agencehds.fr" },
  { label: "+33 6 XX XX XX XX", href: "tel:+33600000000" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-2 border-t border-border-dark pt-[52px] px-5 lg:px-12 text-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-7 lg:gap-10">
        {/* Brand */}
        <div>
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-[1.05rem] text-white"
          >
            <div className="w-8 h-8 rounded-full bg-accent text-dark flex items-center justify-center font-extrabold text-[0.85rem]">
              H
            </div>
            Agence HDS
          </a>
          <p className="text-[0.78rem] text-white/45 leading-[1.7] max-w-[280px] my-3">
            Agence web créative, solutions digitales modernes et performantes.
          </p>
          <div className="flex gap-2.5">
            {/* Facebook */}
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 stroke-white/50 fill-none group-hover:stroke-dark"
                strokeWidth={2}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Quick Link
          </h5>
          <ul className="list-none">
            {quickLinks.map((link) => (
              <li key={link.label} className="mb-2.5">
                <a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Company
          </h5>
          <ul className="list-none">
            {company.map((link) => (
              <li key={link.label} className="mb-2.5">
                <a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Office */}
        <div>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Office
          </h5>
          <ul className="list-none">
            {office.map((link) => (
              <li key={link.label} className="mb-2.5">
                <a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1280px] mx-auto mt-9 py-5 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between text-[0.72rem] text-white/35 gap-2">
        <span>© 2024 Agence HDS. Tous droits réservés.</span>
        <span>Conçu avec passion en Provence</span>
      </div>
    </footer>
  );
}
