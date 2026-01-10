import * as React from "react"
import { graphql, Link } from "gatsby"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ProjectTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <main className="min-h-screen bg-off-white">
      <Header />
      <article className="py-20">
        <div className="section-container">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-medium-gray hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="max-w-3xl">
            {/* 1. Thumbnail */}
            {frontmatter.image && (
              <div className="aspect-video overflow-hidden bg-gray-100 mb-8">
                <img
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
            )}

            {/* 2. Title */}
            <h1 className="font-display font-bold text-3xl md:text-4xl text-charcoal mb-4">
              {frontmatter.title}
            </h1>

            {/* 3. Stack (Tags) */}
            <div className="flex items-center gap-1 mb-6">
              {frontmatter.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <span className="tag">{tag}</span>
                  {index < frontmatter.tags.length - 1 && (
                    <span className="text-medium-gray mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 4. Summary (quote-like block) */}
            {frontmatter.summary && (
              <blockquote className="border-l-4 border-charcoal bg-light-gray/30 pl-6 pr-4 py-4 mb-10 text-medium-gray italic">
                {frontmatter.summary}
              </blockquote>
            )}

            {/* Action Buttons */}
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

            {/* 5. Content */}
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

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} - Vitor Negromonte</title>
    <meta 
      name="description" 
      content={`${data.markdownRemark.frontmatter.title} - ${data.markdownRemark.frontmatter.category}`} 
    />
  </>
)

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
