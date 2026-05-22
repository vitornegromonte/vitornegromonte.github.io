import * as React from "react"
import { graphql, Link, navigate } from "gatsby"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ProjectTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <article className="py-20">
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

          <div className="max-w-3xl">
            {frontmatter.image && (
              <div className="aspect-video overflow-hidden border-2 border-charcoal mb-8">
                <img
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
            )}

            <div className="w-12 h-1.5 bg-charcoal mb-4" />

            <h1 className="font-display text-lg md:text-xl text-charcoal mb-4 leading-relaxed">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              {frontmatter.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <span className="tag">{tag}</span>
                  {index < frontmatter.tags.length - 1 && (
                    <span className="text-light-gray mx-1">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {frontmatter.summary && (
              <blockquote className="border-l-4 border-charcoal pl-6 pr-4 py-4 mb-10 text-gray text-base font-body">
                {frontmatter.summary}
              </blockquote>
            )}

            <div className="flex items-center gap-4 mb-10">
              {frontmatter.projectUrl && frontmatter.projectUrl !== "#" && (
                <a 
                  href={frontmatter.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {frontmatter.codeUrl && frontmatter.codeUrl !== "#" && (
                <a 
                  href={frontmatter.codeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Code className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>

            <div 
              className="prose prose-lg prose-charcoal max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

export default ProjectTemplate

export const Head = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <>
      <title>{frontmatter.title} - Vitor Negromonte</title>
      <meta name="description" content={`${frontmatter.title} — ${frontmatter.summary}`} />

      <meta property="og:title" content={`${frontmatter.title} - Vitor Negromonte`} />
      <meta property="og:description" content={frontmatter.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={frontmatter.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${frontmatter.title} - Vitor Negromonte`} />
      <meta name="twitter:description" content={frontmatter.summary} />
      <meta name="twitter:image" content={frontmatter.image} />
    </>
  )
}

export const query = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        year
        category
        tags
        image
        projectUrl
        codeUrl
        summary
      }
    }
  }
`
