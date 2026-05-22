import * as React from "react"
import { useState, useMemo } from "react"
import { graphql, navigate } from "gatsby"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProjectCard from "../components/ProjectCard"

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
              onClick={() => navigate(-1)}
              className="btn-secondary inline-flex items-center gap-2"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <h1 className="font-display text-xl md:text-2xl text-charcoal mb-2 leading-relaxed">
            Projects
          </h1>
          <div className="w-12 h-1.5 bg-charcoal mb-4" />
          <p className="text-gray max-w-2xl mb-8 text-sm font-body">
            A collection of research projects, open-source tools, and experiments 
            in machine learning, natural language processing, and data science.
          </p>
          
          {/* Filter toggle menu */}
          <div className="relative inline-block mb-10">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-charcoal text-charcoal text-sm font-body font-medium uppercase tracking-wider hover:bg-charcoal hover:text-white transition-none"
            >
              <span>Filter: {activeFilter}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border-2 border-charcoal z-10 min-w-[200px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterSelect(category)}
                    className={`block w-full text-left px-4 py-2 text-sm font-body transition-none ${
                      activeFilter === category
                        ? "bg-charcoal text-white"
                        : "text-gray hover:bg-charcoal hover:text-white"
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
              <p className="text-gray py-8">No projects found in this category.</p>
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
    <meta name="description" content="Research projects and open-source tools by Vitor Negromonte." />

    <meta property="og:title" content="Projects - Vitor Negromonte" />
    <meta property="og:description" content="Research projects and open-source tools by Vitor Negromonte." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://vitornegromonte.github.io/projects" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Projects - Vitor Negromonte" />
    <meta name="twitter:description" content="Research projects and open-source tools by Vitor Negromonte." />
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
