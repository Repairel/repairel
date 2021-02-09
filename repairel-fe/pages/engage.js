import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import Logo from "../public/repairel-logo.svg"

import Socials from "@components/socials";

import { LinedHeading, StyledLink } from "../styles/global";
import {Wishlist} from "@components/product/Product.style.js";

const Engage = ({content}) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | Engage</title>
      </Head>
      <Header />
      <img
        style={{ width: "50%", height: "50%" }}
        src= {Logo}
      ></img>
      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>Engage</LinedHeading>
        <p>
          <Markdown>{content[0].description}</Markdown>
        </p>
        
      </section>
      <section style = {{margin:"5rem", display: "flex", justifyContent: "center"}}>
            
            <Markdown>
                This button will take you to the Just Giving homepage as a place holder
            </Markdown> 
      </section>

      <section style = {{margin:"5rem", display: "flex", justifyContent: "center"}}>
          <a href="https://www.justgiving.com/">
            <Wishlist>Donate</Wishlist>
          </a>
        </section>
      <br></br>
      <Socials></Socials>
    </>
  );
};

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/engages`);
    const json = await res.json();
    return { props: {content: json} };
  }
  
Engage.propTypes = {
  content: PropTypes.array,
};
export default Engage;

