module.exports = {
  siteMetadata: {
    title: `Vitor Negromonte`,
    siteUrl: `https://vitornegromonte.github.io/`,
    description: `Portfolio website of Vitor Negromonte, Data Scientist and Machine Learning Researcher.`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Josefin Sans\:300,400,500,600,700`,
          `Rethink Sans\:400,500,600,700`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `publications`,
        path: `${__dirname}/content/publications`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
  ],
}
