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
    <meta name="description" content="Portfolio website of Vitor Negromonte, Data Scientist and Machine Learning Researcher." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="icon" href="/favicon.ico" />

    <meta property="og:title" content="Vitor Negromonte - Data Scientist & Machine Learning Researcher" />
    <meta property="og:description" content="Portfolio website of Vitor Negromonte, Data Scientist and Machine Learning Researcher." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://vitornegromonte.github.io" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Vitor Negromonte - Data Scientist & Machine Learning Researcher" />
    <meta name="twitter:description" content="Portfolio website of Vitor Negromonte, Data Scientist and Machine Learning Researcher." />

    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vitor Negromonte",
        jobTitle: "Data Scientist & ML Researcher",
        url: "https://vitornegromonte.github.io",
        sameAs: [
          "https://linkedin.com/in/vitornegromonte",
          "https://github.com/vitornegromonte",
          "https://scholar.google.com/citations?user=r4FGCH0AAAAJ"
        ]
      })}
    </script>
  </>
)
