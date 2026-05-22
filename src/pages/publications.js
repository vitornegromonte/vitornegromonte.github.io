import * as React from "react"
import { graphql, navigate } from "gatsby"
import { ArrowLeft } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import PublicationCard from "../components/PublicationCard"

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
              onClick={() => navigate(-1)}
              className="btn-secondary inline-flex items-center gap-2"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <h1 className="font-display text-xl md:text-2xl text-charcoal mb-2 leading-relaxed">
            Publications
          </h1>
          <div className="w-12 h-1.5 bg-charcoal mb-4" />
          <p className="text-gray max-w-2xl mb-12 text-sm font-body">
            Selected peer-reviewed publications and pre-prints.
          </p>
          <div className="max-w-3xl space-y-6">
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
    <meta name="description" content="Selected peer-reviewed publications and pre-prints by Vitor Negromonte." />

    <meta property="og:title" content="Publications - Vitor Negromonte" />
    <meta property="og:description" content="Selected peer-reviewed publications and pre-prints by Vitor Negromonte." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://vitornegromonte.github.io/publications" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Publications - Vitor Negromonte" />
    <meta name="twitter:description" content="Selected peer-reviewed publications and pre-prints by Vitor Negromonte." />
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
