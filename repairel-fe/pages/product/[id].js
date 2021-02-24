import Head from "next/head";
import Header from "@components/header";
import PropTypes from "prop-types";

import Product from "@components/product";
import { useRouter } from "next/router";

const ProductPage = ({ product, esdes }) => {
  var router = useRouter();
  const url = router.asPath;

  return (
    <>
      <Head>
        <title id="title">REPAIREL | {product.name}</title>
      </Head>
      <Header />
      <Product product={product} url={url} esdes={esdes}/>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const json = await res.json();
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/e-and-s-descriptions`);
  const json2 = await res2.json();
  return { props: { product: json, esdes: json2 } };
}

ProductPage.propTypes = {
  product: PropTypes.object,
};
export default ProductPage;
