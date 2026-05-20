import * as React from "react"
import { Linkedin, Github, Instagram, GraduationCap } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 mt-20 border-t-2 border-charcoal">
      <div className="section-container">
        <div className="max-w-3xl flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-display text-sm text-charcoal mb-2 font-bold">Vitor Negromonte</p>
            <p className="text-sm text-gray font-body">
              © {currentYear} All rights reserved.
            </p>
          </div>
          <div className="text-left md:text-right">
            <h4 className="font-display text-sm text-charcoal mb-3 font-bold">Contact</h4>
            <a
              href="mailto:contato.vnco@gmail.com"
              className="text-gray hover:text-charcoal block mb-4 text-sm font-body underline underline-offset-2 decoration-bauhaus-red decoration-2 hover:bg-bauhaus-yellow hover:no-underline"
            >
              contato.vnco@gmail.com
            </a>
            <div className="flex items-center gap-3 md:justify-end">
              <a
                href="https://linkedin.com/in/vitornegromonte"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-charcoal p-2 text-charcoal hover:bg-bauhaus-red hover:text-white hover:border-bauhaus-red transition-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/vitornegromonte"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-charcoal p-2 text-charcoal hover:bg-charcoal hover:text-white transition-none"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/vitor.ncabral"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-charcoal p-2 text-charcoal hover:bg-bauhaus-yellow hover:text-charcoal transition-none"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://scholar.google.com/citations?user=r4FGCH0AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-charcoal p-2 text-charcoal hover:bg-bauhaus-blue hover:text-white hover:border-bauhaus-blue transition-none"
                aria-label="Google Scholar"
              >
                <GraduationCap className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <p className="font-body text-[10px] text-light-gray text-center mt-10 select-none">
          {"/* built with gatsby + tailwind */"}
        </p>
      </div>
    </footer>
  )
}

export default Footer
