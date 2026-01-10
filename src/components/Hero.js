import * as React from "react"
import { Linkedin, Mail, Github, GraduationCap} from "lucide-react"

const Hero = () => {
  return (
    <section id="home" className="py-24 md:py-32">
      <div className="section-container text-center">
        <h1 className="font-display font-bold text-5xl md:text-7xl text-charcoal mb-4">
          Vitor Negromonte
        </h1>
        <h2 className="font-display font-medium text-xl md:text-2xl text-medium-gray mb-10">
          Data Scientist & Machine Learning Researcher
        </h2>
        
        <div className="flex items-center justify-center gap-6">
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
            href="mailto:contato.vnco@gmail.com"
            className="text-medium-gray hover:text-charcoal transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
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
    </section>
  )
}

export default Hero
