import Head from "next/head";
import Header from "@components/header";
import PropTypes from "prop-types";

import Product from "@components/product";
import { useRouter } from "next/router";

const ProductPage = ({ product }) => {
  var router = useRouter();
  const url = router.asPath;

  return (
    <>
      <Head>
        <title id="title">REPAIREL | {product.name}</title>
      </Head>
      <Header />
      <Product product={product} url={url} />
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://35.178.141.40:1337/products/${id}`);
  const json = await res.json();
  return { props: { product: json } };
}

ProductPage.propTypes = {
  product: PropTypes.object,
};
export default ProductPage;
