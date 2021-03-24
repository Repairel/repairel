import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import Socials from '@components/socials';
import ProductList from '@components/productList';
import AppContext from "../context/AppContext";
import { LinedHeading, StyledSection } from '../styles/global';

const WISHLIST = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | WISHLIST</title>
      </Head>
      <Header />
      <LinedHeading style={{marginLeft: ".6em"}}>WISHLIST</LinedHeading>
      {content.length > 0 ? <ProductList    list={content} style={{marginLeft: "1em"}} /> : <div style={{marginLeft: "1em"}}><span>You don't have any wish list items.</span></div>}
    </>
  );
};

export async function getServerSideProps(context) {
  const parsedItems = {};
  const return_json = []
  if (context.req.headers.cookie) {
    const cookiesItems = context.req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  const token = parsedItems['token']
  if (token) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(async (res) => {
      if (!res.ok) {
      Cookie.remove("token");
    }
    const user = await res.json();
    const wishlist = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wishlists?user=${user.id}`, { headers: { Authorization: `Bearer ${token}` } })
    for(var i = 0; i < wishlist.data.length; i++){
      return_json[i] = wishlist.data[i].product[0];
    }
      });
  }
  return{ props: { content: return_json }

  }
}

WISHLIST.propTypes = {
  content: PropTypes.array,
};
export default WISHLIST;
