import * as React from "react"
import { Linkedin, Github, Instagram, GraduationCap } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 mt-20 border-t border-light-gray">
      <div className="section-container">
        <div className="max-w-3xl flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-display font-medium text-charcoal mb-2">Vitor Negromonte</p>
            <p className="text-sm text-medium-gray">
              © {currentYear} Vitor Negromonte. All rights reserved.
            </p>
          </div>
          <div className="text-left md:text-right">
            <h4 className="font-display font-medium text-charcoal mb-3">Get in Touch</h4>
            <a
              href="mailto:contato.vnco@gmail.com"
              className="text-medium-gray hover:text-charcoal transition-colors block mb-4"
            >
              contato.vnco@gmail.com
            </a>
            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="https://linkedin.com/in/vitornegromonte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray hover:text-charcoal transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/vitornegromonte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray hover:text-charcoal transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/vitor.ncabral"
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray hover:text-charcoal transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://scholar.google.com/citations?user=r4FGCH0AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray hover:text-charcoal transition-colors"
                aria-label="Google Scholar"
              >
                <GraduationCap className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
