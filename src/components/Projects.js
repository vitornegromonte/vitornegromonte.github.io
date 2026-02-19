import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Code } from "lucide-react"

const ProjectCard = ({ project }) => {
  const { frontmatter, fields } = project
  
  return (
    <article className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-8 py-6 border-b-2 border-dashed border-light-gray last:border-0">
      <div className="aspect-[16/10] overflow-hidden border-2 border-charcoal shadow-pixel-sm hover:shadow-pixel hover:-translate-y-0.5 transition-all duration-100">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="w-full h-full object-cover grayscale opacity-80"
        />
      </div>
      <div className="flex flex-col">
        <p className="metadata mb-1">
          {frontmatter.year} · {frontmatter.category}
        </p>
        <h3 className="font-display text-base md:text-lg text-charcoal leading-snug mb-2">
          {frontmatter.title}
        </h3>
        <p className="text-medium-gray leading-relaxed text-sm mb-3">
          {frontmatter.summary}
        </p>
        <div className="flex items-center gap-1 flex-wrap mb-4">
          {frontmatter.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <span className="tag">{tag}</span>
              {index < frontmatter.tags.length - 1 && (
                <span className="text-light-gray mx-1">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <Link to={fields.slug} className="btn-primary">
            View Project
          </Link>
          {frontmatter.codeUrl && frontmatter.codeUrl !== "#" && (
            <a href={frontmatter.codeUrl} className="btn-secondary">
              <Code className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { frontmatter: { year: DESC } }
        limit: 3
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            id
            title
            year
            category
            tags
            image
            codeUrl
            summary
          }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        <div className="max-w-3xl space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <a href="/projects" className="btn-secondary">
            All Projects →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
