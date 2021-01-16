import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import ProductList from '@components/productList';
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router";

import { isLogged } from "../lib/auth"

export default function Home({ list }) {
  const { user, setUser } = useContext(AppContext);
  const router = useRouter();

  // Whenevr the user was redirected from the edit form for some
  // unexplainable reason the app didn't think they were logged
  // in anymore, so this little hack helps prevent that issue by
  // reloading the page for the user.
  if (process.browser && router.asPath.includes("redirect=edit")) {
    router.push('/', '/', { shallow: true });
    setTimeout(() => {
      router.reload();
    }, 500);
  }

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
  return { props: { list: json } };
}

Home.propTypes = {
  list: PropTypes.array,
};
