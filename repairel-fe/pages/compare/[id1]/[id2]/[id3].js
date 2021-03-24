import Head from "next/head";
import Header from "@components/header";
import Compare from "@components/compare";
import PropTypes from "prop-types";

const Comparison = ({ products }) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | Compare</title>
      </Head>
      <Header />
      <Compare product1={products[0]} product2={products[1]} product3 = {products[2]} />
    </>
  );
};

export async function getServerSideProps(context) {
  const product1 = context.params.id1;
  const product2 = context.params.id2;
  const product3 = context.params.id3;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/?id_in=${product1}&id_in=${product2}&id_in=${product3}`);
  const json = await res.json();
  return { props: { products: json } };
}

Comparison.propTypes = {
  products: PropTypes.array,
};

export default Comparison;
