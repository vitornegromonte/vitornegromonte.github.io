import * as React from "react"
import { ChevronDown } from "lucide-react"

const About = () => {
  const [openInterests, setOpenInterests] = React.useState(false)
  const interests = [
    "Causal ML",
    "Dynamical Systems",
    "Self-referential Systems",
    "Neural Algorithmic Reasoning",
    "Knowledge Representation",
    "Mechanistic Interpretability",
  ]
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <h2 className="section-title">About</h2>
        <div className="space-y-5 max-w-3xl text-base">
            <p className="text-gray leading-relaxed">
              I'm a Data Scientist and Machine Learning Researcher with a passion for exploring
              Knowledge Representation and Neural Algorithmic Reasoning, with deep interests in Self-referential Systems and Mechanistic Interpretability.
            </p>
            <p className="text-gray leading-relaxed">
              Currently, I'm Outreach Director at the <a href="https://www.instagram.com/ligia.ufpe/" className="text-charcoal underline underline-offset-2 decoration-bauhaus-red decoration-2 hover:bg-bauhaus-yellow hover:no-underline">Ligia</a>,
               where I lead partnership development, organize AI‐focused events, and create educational content to promote AI learning and application across multiple disciplines
            </p>
            <p className="text-gray leading-relaxed">
             Outside academics, I enjoy photography, reading, sports, and creative coding.
            </p>
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg text-charcoal mb-4">Research Interests</h3>
                <button
                  type="button"
                  className="md:hidden inline-flex items-center gap-2 text-sm text-gray hover:text-charcoal"
                  aria-expanded={openInterests}
                  aria-controls="research-interests"
                  onClick={() => setOpenInterests(!openInterests)}
                >
                  <span className="sr-only">Toggle research interests</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openInterests ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div id="research-interests" className={`${openInterests ? "max-h-96" : "max-h-0"} overflow-hidden transition-all duration-300 md:max-h-none md:overflow-visible`}>
                <ul className="md:flex flex-wrap gap-3 mt-2">
                  {interests.map((interest) => (
                    <li
                      key={interest}
                      className="px-3 py-1.5 border-2 border-charcoal text-sm text-charcoal font-body mr-2 mb-2 inline-block hover:bg-bauhaus-yellow hover:border-bauhaus-yellow transition-none"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default About
