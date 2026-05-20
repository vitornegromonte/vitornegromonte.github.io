import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PublicationCard from "./PublicationCard"

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
    <section id="publications" className="py-20">
      <div className="section-container">
        <h2 className="section-title">Publications</h2>
        <div className="max-w-3xl space-y-6">
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
        <div className="mt-8">
          <a href="/publications" className="btn-secondary">
            All Publications →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Publications
