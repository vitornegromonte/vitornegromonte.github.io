import * as React from "react"
import { Code } from "lucide-react"

const PdfIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const PublicationCard = ({ publication, showDetails }) => {
  const { frontmatter, html } = publication

  return (
    <article className="border-2 border-charcoal hover:shadow-pixel-sm transition-shadow duration-100">
      <div className="p-5 md:p-8">
        <p className="metadata mb-1">
          {frontmatter.year} · {frontmatter.venue}
        </p>
        <h3 className="font-display text-base md:text-lg text-charcoal mb-2 leading-snug">
          {frontmatter.title}
        </h3>
        <p className="text-medium-gray leading-relaxed text-sm mb-1">
          {html.replace(/<[^>]*>/g, '')}
        </p>
        <p className="text-sm text-medium-gray mb-4 italic font-body">
          {frontmatter.venueDetails}
        </p>
        <div className="flex items-center gap-2">
          {frontmatter.pdfUrl && frontmatter.pdfUrl !== "#" && (
            <a href={frontmatter.pdfUrl} className="btn-secondary">
              <PdfIcon />
              PDF
            </a>
          )}
          {frontmatter.codeUrl && frontmatter.codeUrl !== "#" && (
            <a href={frontmatter.codeUrl} className="btn-secondary">
              <Code className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default PublicationCard
