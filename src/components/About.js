import * as React from "react"

const About = () => {
  return (
    <section id="about" className="py-20 border-t border-light-gray">
      <div className="section-container">
        <h2 className="section-title">About</h2>
        <div className="space-y-6 max-w-3xl">
            <p className="text-charcoal leading-relaxed">
              I'm a Data Scientist and Machine Learning Researcher with a passion for exploring
              Knowledge Representation and Neural Algorithmic Reasoning, with deep interests in Self-referential Systems and Mechanistic Interpretability.
            </p>
            <p className="text-charcoal leading-relaxed">
              Currently, I'm Outreach Director at the <a href="https://www.instagram.com/ligia.ufpe/" className="text-charcoal underline hover:text-charcoal/80">Ligia</a>,
               where I lead partnership development, organize AI‐focused events, and create educational content to promote AI learning and application across multiple disciplines
            </p>
            <p className="text-charcoal leading-relaxed">
             Outside academics, I enjoy photography, reading, sports, and creative coding.
            </p>
            <div className="pt-4">
              <h3 className="font-display font-semibold text-charcoal mb-4">Research Interests</h3>
              <ul className="flex flex-wrap gap-3">
                {[
                  "Computational Linguistics",
                  "Self-referential Systems",
                  "Neural Algorithmic Reasoning",
                  "Knowledge Representation",
                  "Mechanistic Interpretability",
                  "Cognitive Modeling",
                ].map((interest) => (
                  <li
                    key={interest}
                    className="px-3 py-1.5 border border-light-gray text-sm text-medium-gray"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </section>
  )
}

export default About
