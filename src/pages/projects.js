import * as React from "react"
import { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import { Code, ChevronDown } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ProjectCard = ({ project }) => {
  const { frontmatter, fields } = project
  
  return (
    <article className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-8 py-6 border-b border-light-gray last:border-0">
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="w-full h-full object-cover grayscale opacity-80"
        />
      </div>
      <div className="space-y-3">
        <p className="metadata">
          {frontmatter.year} — {frontmatter.category}
        </p>
        <h3 className="font-display font-semibold text-lg md:text-xl text-charcoal">
          {frontmatter.title}
        </h3>
        <p className="text-medium-gray leading-relaxed text-sm">
          {frontmatter.summary}
        </p>
        <div className="flex items-center gap-1">
          {frontmatter.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <span className="tag">{tag}</span>
              {index < frontmatter.tags.length - 1 && (
                <span className="text-medium-gray mx-2">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Link to={fields.slug} className="btn-primary">
            View Project
          </Link>
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

const ProjectsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes
  const [activeFilter, setActiveFilter] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((p) => p.frontmatter.category))]
    return ["All", ...uniqueCategories]
  }, [projects])

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.frontmatter.category === activeFilter)

  const handleFilterSelect = (category) => {
    setActiveFilter(category)
    setIsFilterOpen(false)
  }

  return (
    <main className="min-h-screen bg-off-white">
      <Header />
      <section className="py-20">
        <div className="section-container">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-charcoal mb-4">
            Projects
          </h1>
          <p className="text-medium-gray max-w-2xl mb-8">
            A collection of research projects, open-source tools, and experiments 
            in machine learning, natural language processing, and data science.
          </p>
          
          {/* Filter toggle menu */}
          <div className="relative inline-block mb-10">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-charcoal text-charcoal text-xs font-medium uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors"
            >
              <span>Filter: {activeFilter}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 bg-off-white border border-light-gray shadow-sm z-10 min-w-[200px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterSelect(category)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      activeFilter === category
                        ? "bg-charcoal text-white"
                        : "text-medium-gray hover:bg-light-gray hover:text-charcoal"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-3xl space-y-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <p className="text-medium-gray py-8">No projects found in this category.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ProjectsPage

export const Head = () => (
  <>
    <title>Projects - Vitor Negromonte</title>
    <meta name="description" content="Research projects and open-source tools by Vitor Negromonte" />
  </>
)

export const query = graphql`
  query AllProjectsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { frontmatter: { year: DESC } }
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
`
