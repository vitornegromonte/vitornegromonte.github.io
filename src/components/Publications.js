import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Quote, Github } from "lucide-react"

const PdfIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const PublicationCard = ({ publication }) => {
  const { frontmatter, html } = publication
  
  return (
    <article className="py-5 border-b border-light-gray last:border-0">
      <p className="metadata mb-2">
        {frontmatter.year} — {frontmatter.venue}
      </p>
      <h3 className="font-display font-semibold text-base md:text-lg text-charcoal mb-2">
        {frontmatter.title}
      </h3>
      <p className="text-medium-gray leading-relaxed text-sm mb-2">
        {html.replace(/<[^>]*>/g, '')}
      </p>
      <p className="text-xs text-medium-gray mb-3 italic">
        {frontmatter.venueDetails}
      </p>
      <div className="flex items-center gap-3">
        <a href={frontmatter.pdfUrl} className="btn-secondary">
          <PdfIcon />
          PDF
        </a>
        <a href={frontmatter.codeUrl} className="btn-secondary">
          <Github className="w-4 h-4" />
          Code
        </a>
        <a href={frontmatter.citeUrl} className="btn-secondary">
          <Quote className="w-4 h-4" />
          Cite
        </a>
      </div>
    </article>
  )
}

const Publications = () => {
  const data = useStaticQuery(graphql`
    query PublicationsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/publications/" } }
        sort: { frontmatter: { year: DESC } }
        limit: 3
      ) {
        nodes {
          id
          html
          frontmatter {
            id
            title
            year
            venue
            venueDetails
            pdfUrl
            citeUrl
            codeUrl
          }
        }
      }
    }
  `)

  const publications = data.allMarkdownRemark.nodes

  return (
    <section id="publications" className="py-20 border-t border-light-gray">
      <div className="section-container">
        <h2 className="section-title">Publications</h2>
        <div className="max-w-3xl">
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
        <div className="mt-8">
          <a href="/publications" className="btn-secondary">
            All Publications
          </a>
        </div>
      </div>
    </section>
  )
}

export default Publications
