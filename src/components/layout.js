import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import '../assets/sass/main.scss';
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'A Cardano stake pool dedicated to running the network and donating to charity.' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: 'Stake For Good' },
            { name: 'twitter:description', content: 'A Cardano stake pool dedicated to running the network and donating to charity.' },
            { name: 'twitter:site', content: '@StakeForGood' },
            { name: 'twitter:image', content: 'https://stakeforgood.org/images/stake-for-good.png' },
            { name: 'twitter:image:alt', content: 'Stake For Good website' },
            { name: 'og:type', content: 'website' },
            { name: 'og:title', content: 'Stake For Good' },
            { name: 'og:description', content: 'A Cardano stake pool dedicated to running the network and donating to charity.' },
            { name: 'og:image', content: 'https://stakeforgood.org/images/stake-for-good.png' },
            { name: 'og:image:alt', content: 'Stake For Good website' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>{children}</div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
