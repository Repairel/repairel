import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import ProductList from '@components/productList';
import AppContext from "../context/AppContext";
import { LinedHeading, StyledSection } from '../styles/global';

const WISHLIST = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | PROFILE</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>PROFILE</LinedHeading>
          {/* <Markdown>{content[0].title}</Markdown> */}
        </main>
        <footer style={{marginBottom: '1rem'}}>
          <Socials />
        </footer>
      </StyledSection>
    </>
  );
};

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`);
    const json = await res.json();
    return { props: { content: json } };
  }

WISHLIST.propTypes = {
  content: PropTypes.array,
};
export default WISHLIST;
