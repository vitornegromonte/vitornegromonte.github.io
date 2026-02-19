import * as React from "react"
import { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import { ArrowLeft, Code, ChevronDown } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

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
            Projects
          </h1>
          <p className="text-medium-gray max-w-2xl mb-8 text-sm font-body">
            A collection of research projects, open-source tools, and experiments 
            in machine learning, natural language processing, and data science.
          </p>
          
          {/* Filter toggle menu */}
          <div className="relative inline-block mb-10">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-charcoal text-charcoal text-sm font-body font-medium uppercase tracking-wider shadow-pixel-sm hover:shadow-pixel hover:-translate-y-0.5 transition-all duration-100"
            >
              <span>Filter: {activeFilter}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 bg-off-white border-2 border-charcoal shadow-pixel z-10 min-w-[200px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterSelect(category)}
                    className={`block w-full text-left px-4 py-2 text-sm font-body transition-colors ${
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
