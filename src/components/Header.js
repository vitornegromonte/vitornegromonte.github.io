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
    <header className="sticky top-0 z-50 bg-white border-b-2 border-charcoal">
      <div className="section-container">
        <nav className="max-w-3xl flex items-center justify-between py-3">
          <a href="/" className="font-display text-charcoal text-lg font-bold tracking-tight">
            VN<span className="text-bauhaus-red">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-body uppercase tracking-wider text-charcoal px-3 py-1.5 hover:bg-bauhaus-yellow transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-charcoal font-display text-sm border-2 border-charcoal px-2 py-1" aria-label="Menu">
            ☰
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
