interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-[0.78rem]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-white/20 mx-1">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-white/40 hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-white/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
