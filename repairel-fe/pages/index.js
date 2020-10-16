import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import ProductList from '@components/productList';

export default function Home({ list }) {
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
  const res = await fetch(`http://35.178.141.40:1337/products`);
  const json = await res.json();
  return { props: { list: json } };
}

Home.propTypes = {
  list: PropTypes.array,
};
