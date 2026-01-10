import * as React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Publications from "../components/Publications"
import Cv from "../components/CV"
import Footer from "../components/Footer"

const IndexPage = () => {
  return (
    <main className="min-h-screen bg-off-white">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Publications />
      <Cv />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Vitor Negromonte - Data Scientist & Machine Learning Researcher</title>
    <meta name="description" content="Portfolio website of Vitor Negromonte, Data Scientist and Machine Learning Researcher" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
)
