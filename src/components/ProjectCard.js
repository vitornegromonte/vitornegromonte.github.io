import * as React from "react"
import { Link } from "gatsby"
import { Code } from "lucide-react"

const ProjectCard = ({ project, showAll }) => {
  const { frontmatter, fields } = project

  return (
    <article className="border-2 border-charcoal hover:shadow-pixel-sm transition-shadow duration-100">
      <div className="p-5 md:p-8">
        <div className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-8">
          <div className="aspect-[16/10] overflow-hidden border-2 border-charcoal">
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              loading="lazy"
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
            <p className="text-gray leading-relaxed text-sm mb-3">
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
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
