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
    <header className="sticky top-0 z-50 bg-off-white/95 backdrop-blur-sm border-b border-light-gray/50">
      <div className="section-container">
        <nav className="max-w-3xl flex items-center justify-between py-4">
          <a href="/" className="font-display font-medium text-charcoal text-lg">
            Vitor Negromonte
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-medium-gray hover:text-charcoal transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile menu button */}
          <button className="md:hidden text-charcoal" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
