import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import Logo from '../public/repairel-logo.svg';

import Socials from "@components/socials";

import { LinedHeading, StyledLink } from "../styles/global";
import {Wishlist} from "@components/product/Product.style.js";

const Terms = ({ content }) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | Terms and Conditions</title>
      </Head>
      <Header />
      <center><img
        style={{ width: "25%", height: "25" }}
        src= {Logo}
      ></img></center>

      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>Terms & Conditions</LinedHeading>
        <Markdown>{content[0].info}</Markdown>
      </section>


    </>
  );
};


export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/terms`);
    const json = await res.json();
    return { props: { content: json } };
    }

 Terms.propTypes = {
    content: PropTypes.array,
  };
  export default Terms;
