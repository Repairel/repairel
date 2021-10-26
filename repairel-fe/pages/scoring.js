import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import { Circle } from '@components/compare/Compare.style';
import Material from '../public/material.svg';
import MaterialProcessing from '../public/leaf.svg';
import Manufacturing from '../public/manufacturing.svg';
import Assembly from '../public/material-processing.svg';
import Use from '../public/use.svg';
import Disposal from '../public/disposal.svg';
import Design from '../public/assembly.svg';

import _ from 'lodash';

import { LinedHeading, LinedSubHeading, StyledSection } from '../styles/global';
import {ScoresDiv, ScoresListItem, ScoresCaption, CriteriaDiv, CriteriaListItem, CriteriaText, CriteriaImage} from '../styles/scoringStyles';

import ReactGA from 'react-ga';
ReactGA.pageview('/scoring');

const icons = {
  Design: Design,
  Raw_Materials: Material,
  Material_Manufacturing: MaterialProcessing,
  Footwear_Manufacturing: Manufacturing,
  Retail: Assembly,
  Use: Use,
  Disposal: Disposal,
};

const scoresRender = (likert) => {
  let scores = initialiseCategories(likert);
  return scores.map((scores) => {
    return (
      <ScoresListItem key={scores[0]}>
        <ScoresDiv int={scores[1]}>{handleCircles(scores[1])}</ScoresDiv>
        <ScoresCaption>{scores[0].split('_').join(' ')}</ScoresCaption>
      </ScoresListItem>
    );
  });
};

const initialiseCategories = (likert) => {
  const categories = Object.keys(likert); //likert will have to be changed to reflect the name of the categories from the strapi collection
  //console.log("please show this text")
  const scores = [];
  for (let category of categories.slice(1)) {
    scores.push([
      category,
      likert[category],
    ]);
  }
  return scores
}

const handleCircles = (numberOfCircles) => {
  let array = [];
  _.times(numberOfCircles, (i) => {
    array.push(<Circle int={numberOfCircles} key={i} />);
  });
  return array;
};

const initialiseCriteria = (content) => {
  const criteria = [];
  const categories = Object.keys(icons);
  const categoriesLength = categories.length;
  for (var i = 0; i < categoriesLength; i++) {
    let catName = categories[i];
    criteria.push([
      icons[catName],
      catName,
      content[catName]
    ]);
    console.log(catName);
  }
  return criteria;
}

const categoriesRender = (content) => {
  let criteria = initialiseCriteria(content);
  return criteria.map((criteria) => {
    return (
      <CriteriaListItem>
        <CriteriaDiv>
          <CriteriaImage src={criteria[0]}></CriteriaImage>
          <p>{criteria[1].split("_").join(" ")}</p>
        </CriteriaDiv>
        <CriteriaText>{criteria[2]}</CriteriaText>
        <br></br>
      </CriteriaListItem>
    );
  });
};


const scoring = ({ content }) => {
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | Scoring System</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>Sustainability</LinedHeading>
          <Markdown>{content[0].introduction}</Markdown>

          <LinedSubHeading>Scores</LinedSubHeading>
          <div>{scoresRender(content[0].likert[0])}</div>

          <LinedSubHeading>Criteria</LinedSubHeading>
          <div>{categoriesRender(content[0])}</div>
          <LinedSubHeading>Blurb</LinedSubHeading>
          <div>{(content[0].blurb)}</div>
          <LinedSubHeading>Notice</LinedSubHeading>
          <p>
          For refurbished products (P1), their scores can be ignored for now as the current Sustainability Framework only supports scoring new products (P2).
          </p>
        </main>

      </StyledSection>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scorings`);
  const json = await res.json();
  return { props: { content: json } };
}

scoring.propTypes = {
  content: PropTypes.array,
};
export default scoring;
