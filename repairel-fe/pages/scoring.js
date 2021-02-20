import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';

import { LinedHeading, StyledSection } from '../styles/global';

const scoring = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | Scoring System</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>Scoring System</LinedHeading>
          {/* <Markdown>{content[0].text}</Markdown> */}
        </main>
        <footer style={{marginBottom: '1rem'}}>
          <Socials />
        </footer>
      </StyledSection>
    </>
  );
};

// export async function getServerSideProps() {
//   // const res = await fetch(`http://35.178.141.40:1337/scorings`);
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scoring`);
//   const json = await res.json();
//   return { props: { content: json } };
// }

scoring.propTypes = {
  content: PropTypes.array,
};
export default scoring;
