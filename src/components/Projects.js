import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProjectCard from "./ProjectCard"

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
