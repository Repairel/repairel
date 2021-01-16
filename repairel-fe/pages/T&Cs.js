import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";


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
      <img
        style={{ width: "100%", height: "auto" }}
        src= {Logo}
      ></img>
      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>Terms and Conditions of use</LinedHeading>
        <Markdown>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Malesuada amet pulvinar nec fermentum tincidunt pulvinar. 
            Non nunc diam augue nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Malesuada amet pulvinar nec fermentum tincidunt pulvinar. Non nunc diam augue nulla. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Markdown>  
      </section>
     
      <Socials></Socials>
    </>
  );
};


export async function getServerSideProps() {
    // const res = await fetch(`http://35.178.141.40:1337/faqs`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/terms`);
    const json = await res.json();
    return { props: { content: json } };
    }
  
 Terms.propTypes = {
    content: PropTypes.array,
  };
  export default Terms;
