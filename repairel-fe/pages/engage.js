import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
//import PropTypes from "prop-types";
import Logo from "../public/eco_feet .svg";

import Socials from "@components/socials";

import { LinedHeading, StyledLink } from "../styles/global";
import {Wishlist} from "@components/product/Product.style.js";

const Engage = ({ content }) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | Engage</title>
      </Head>
      <Header />
      <center><img
        style={{ width: "25%", height: "25" }}
        src= {Logo}
      ></img></center>
      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>Engage</LinedHeading>
        <Markdown>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Malesuada amet pulvinar nec fermentum tincidunt pulvinar. 
            Non nunc diam augue nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Malesuada amet pulvinar nec fermentum tincidunt pulvinar. Non nunc diam augue nulla. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Markdown>  
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

/*
export async function getServerSideProps() {
//    const res = await fetch(`http://35.178.141.40:1337/abouts`);
//    const json = await res.json();
//    return { props: { content: json } };
//  }
  
  Engage.propTypes = {
    content: PropTypes.array,
  };
//  export default Engage;

}
*/

export default Engage;

