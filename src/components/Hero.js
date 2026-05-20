import * as React from "react"
import { Linkedin, Mail, Github, GraduationCap} from "lucide-react"

const Hero = () => {
  return (
    <section id="home" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-24 h-24 bg-bauhaus-red" />
      <div className="absolute top-0 right-12 w-16 h-16 bg-bauhaus-yellow" />
      <div className="absolute bottom-12 left-1/3 w-12 h-12 border-4 border-bauhaus-blue" />
      <div className="absolute bottom-24 right-24 w-8 h-8 bg-charcoal" />
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-charcoal mb-4 leading-[1.1] tracking-tight">
            Vitor Negromonte
          </h1>
          <div className="w-16 h-1.5 bg-bauhaus-red mx-auto mb-6" />
          <h2 className="font-body font-medium text-base md:text-lg text-gray mb-10 tracking-wide">
            Data Scientist <span className="text-bauhaus-red mx-1">·</span> ML Researcher
          </h2>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://linkedin.com/in/vitornegromonte"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-charcoal p-2.5 text-charcoal hover:bg-bauhaus-red hover:text-white hover:border-bauhaus-red transition-none"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contato.vnco@gmail.com"
              className="border-2 border-charcoal p-2.5 text-charcoal hover:bg-bauhaus-yellow hover:text-charcoal hover:border-bauhaus-yellow transition-none"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/vitornegromonte"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-charcoal p-2.5 text-charcoal hover:bg-charcoal hover:text-white transition-none"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://scholar.google.com/citations?user=r4FGCH0AAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-charcoal p-2.5 text-charcoal hover:bg-bauhaus-blue hover:text-white hover:border-bauhaus-blue transition-none"
              aria-label="Google Scholar"
            >
              <GraduationCap className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
