import * as React from "react"

const Header = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#publications", label: "Publications" },
    { href: "/#cv", label: "CV" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-off-white border-b border-charcoal/10">
      <div className="section-container">
        <nav className="max-w-3xl flex items-center justify-between py-3">
          <a href="/" className="font-display text-charcoal text-medium tracking-tight hover:text-medium-gray transition-colors">
            {">"} <span className="font-bold">Vitor Negromonte</span>
          </a>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-body uppercase tracking-wider text-medium-gray hover:text-charcoal transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile menu button */}
          <button className="md:hidden text-charcoal font-display text-sm" aria-label="Menu">
            [=]
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
