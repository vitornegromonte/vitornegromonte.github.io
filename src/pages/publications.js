import * as React from "react"
import { graphql } from "gatsby"
import { ArrowLeft, Code } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const PdfIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const PublicationCard = ({ publication }) => {
  const { frontmatter, html } = publication
  
  return (
    <article className="py-6 border-b-2 border-dashed border-light-gray last:border-0">
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
    </article>
  )
}

const PublicationsPage = ({ data }) => {
  const publications = data.allMarkdownRemark.nodes

  return (
    <main className="min-h-screen bg-off-white">
      <Header />
      <section className="py-20">
        <div className="section-container">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center gap-2"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to previous page
            </button>
          </div>
          <h1 className="font-display text-xl md:text-2xl text-charcoal mb-4 leading-relaxed">
            Publications
          </h1>
          <p className="text-medium-gray max-w-2xl mb-12 text-sm font-body">
            Selected peer-reviewed publications and pre-prints.
          </p>
          <div className="max-w-3xl">
            {publications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default PublicationsPage

export const Head = () => (
  <>
    <title>Publications - Vitor Negromonte</title>
    <meta name="description" content="Selected peer-reviewed publications and pre-prints by Vitor Negromonte" />
  </>
)

export const query = graphql`
  query AllPublicationsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: { frontmatter: { year: DESC } }
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
`
