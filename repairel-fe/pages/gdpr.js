import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';

import { LinedHeading, StyledSection } from '../styles/global';

const GDPR = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | GDPR</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>GDPR</LinedHeading>
          <Markdown>{content[0].text}</Markdown>
        </main>
      </StyledSection>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gdprs`);
  const json = await res.json();
  return { props: { content: json } };
}

GDPR.propTypes = {
  content: PropTypes.array,
};
export default GDPR;
