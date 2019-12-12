import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Scroll from '../components/Scroll';
import Vote from '../components/Vote';

const IndexPage = ({ data }) => (
  <Layout>
    <Sidebar />

    <div id="wrapper">
      <section id="intro" className="wrapper style1 fullscreen fade-up">
        <div className="inner">
          <div className='home-title'>
            <div>
              <Img fluid={data.file.childImageSharp.fluid} />
            </div>
            <h1>Stake For Good</h1>
          </div>
          <p>
            A <a href='https://cardano.org/' rel='nofollow'>Cardano</a> stake pool where you decide how the rewards are distributed.
          </p>
          <ul className="actions">
            <li>
              <Scroll type="id" element="have-your-say">
                <a href="#have-your-say" className="button">
                  Vote now
                </a>
              </Scroll>
            </li>
          </ul>
        </div>
      </section>

      <section id="have-your-say" className="wrapper style3 fade-up">
        <div className="inner">
          <h2>Have your say</h2>
          <p>
            Stake For Good is a Cardano <a href='https://staking.cardano.org/'>stake pool</a> dedicated to donating money to good causes and charities around the world, where you decide how the rewards are distributed.
          </p>
          <div className="features">
            <section>
              <div className="inner">
                <h2>Vote now</h2>
                <p>
                  Vote for your preferred charity. Voting closes after the current epoch. The rewards from the next epoch will be distributed according to the voting results.
                </p>
              </div>
            </section>
            <section>
              <Vote />
            </section>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </Layout>
);

export const query = graphql`
  query {
    file(relativePath: { eq: "stake-for-good-icon.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default IndexPage;
