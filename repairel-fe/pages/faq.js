import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';

import { LinedHeading, StyledSection } from '../styles/global';

const FAQ = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | FAQ</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>FAQs</LinedHeading>
          <Markdown>{content[0].text}</Markdown>
        </main>

      </StyledSection>
    </>
  );
};

export async function getServerSideProps() {
  // const res = await fetch(`http://35.178.141.40:1337/faqs`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`);
  const json = await res.json();
  return { props: { content: json } };
}

FAQ.propTypes = {
  content: PropTypes.array,
};
export default FAQ;
