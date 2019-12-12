const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Stake For Good - A Cardano stake pool for charities',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `img`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Stake For Good',
        short_name: 'Good',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/assets/img/stake-for-good-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
};
