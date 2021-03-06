import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import Logo from "../public/eco_feet .svg";
import Link from "next/link";

import Socials from "@components/socials";

import { LinedHeading, StyledAnimatedButton, font } from "../styles/global";
import ReactGA from 'react-ga';
ReactGA.pageview('/engage');

// This is the correct engage page
const Engage = ({content}) => {
  return (
    <>
      <Head>
        <title id="title">REPAIREL | Activism</title>
      </Head>
      <Header />
      <div style={{ margin: "1rem" }}>
        <LinedHeading>Activism</LinedHeading>
        <div style={{ marginBottom: "2.5em" }}>
          <Markdown>{content[0].text}</Markdown>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href={content[0].url}>
            <StyledAnimatedButton>Donate</StyledAnimatedButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/engages`);
  const json = await res.json();
  return { props: { content: json } };
}

Engage.propTypes = {
  content: PropTypes.array,
};

export default Engage;
