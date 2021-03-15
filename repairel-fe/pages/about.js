import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";

import Socials from "@components/socials";

import { LinedHeading } from "../styles/global";

const About = ({ content }) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | About</title>
      </Head>
      <Header />
      <img
        style={{ width: "100%", height: "auto" }}
        src={content[0].image.url}
      ></img>
      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>About us</LinedHeading>
        <Markdown>{content[0].about}</Markdown>
        <Socials />
      </section>
    </>
  );
};


export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abouts`);
  const json = await res.json();
  return { props: { content: json } };
}

About.propTypes = {
  content: PropTypes.array,
};
export default About;
