import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import ProductList from '@components/productList';
import AppContext from "../context/AppContext";
import { useContext } from "react";

import { isLogged } from "../lib/auth"

export default function Home({ list }) {
  const { user, setUser } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title id='title'>REPAIREL</title>
      </Head>
      <main>
        <Header />
        <ProductList list={list} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const json = await res.json();

  console.log(res)

  return { props: { list: json } };
}

Home.propTypes = {
  list: PropTypes.array,
};
