import React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/layout';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Scroll from '../components/Scroll';
import Vote from '../components/Vote';

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

      <section id="explained" className="wrapper style1">
        <div className="inner">
          <h2>Stake For Good explained</h2>
          <p>
            Cardano is a decentralised blockchain network based on the proof of stake (PoS) protocol <a href='https://www.cardano.org/en/ouroboros/'>Ouroboros</a>. As a stake pool, Stake For Good helps to run the network. By delegating to a stake pool you are pledging your support to that stake pool. In return stake pools receive rewards for running helping to run the network, as well as anyone delegating their stake to a stake pool.
          </p>
          <p>
            By choosing to pledge to Stake For Good, you will receive your rewards as you would from any other stake pool, but in return Stake For Good promises to donate a portion of it's reward to charities chosen by the community.
          </p>
          <h3>Our promise</h3>
          <ol>
            <li>To run a successful node on cloud based infrastructure to ensure high availability and redundancy.</li>
            <li>To donate 0.3 ADA for every 1 ADA earned by the stake pool. This has no effect on the rewards you receive as a delegator.</li>
            <li>To ensure our margins remain fair and competitive.</li>
            <li>We will set our fixed costs only to cover our cloud infrastructure costs. The fixed costs will be revised periodically to ensure they are inline with the current ADA -> USD exchange rates.</li>
          </ol>
          <h3>How do I delegate?</h3>
          <p>You can delegate to us via Daedalus or Yoroi. Both of which will be releasing a testnet version of their applications. You can find us under the ticker "GOOD"</p>
          <p><em>We anticipate reducing the fixed fees once we can update our stake pool parameters.</em></p>
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
                  Vote for your preferred charity. Voting closes after the current epoch. The rewards from the next epoch will be distributed according to the voting results.*
                </p>
                <p>
                  * <small>For every 1 ADA earned in rewards 0.3 ADA will be donated to charities.</small>
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
