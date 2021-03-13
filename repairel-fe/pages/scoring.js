import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import { Circle } from '@components/compare/Compare.style';
import Material from '../../public/material.svg';
import materialProcessing from '../../public/material-processing.svg';
import Manufacturing from '../../public/manufacturing.svg';
import Assembly from '../../public/assembly.svg';
import Use from '../../public/use.svg';
import Disposal from '../../public/disposal.svg';

import { LinedHeading, LinedSubHeading, StyledSection } from '../styles/global';
import { ScoresDiv, ScoresListItem, ScoresCaption } from '../styles/scoringStyles';

const icons = {
  material: Material,
  material_processing: materialProcessing,
  manufacturing: Manufacturing,
  assembly: Assembly,
  use: Use,
  disposal: Disposal,
};

const categories = Object.keys(Scorings.propTypes.likert); //likert will have to be changed to reflect the name of the categories from the strapi collection
const scores = [];
for (let category of categories) {
  scores.push([
    category,
    Scorings.propTypes.likert[category],
  ]);
}

const handleCircles = (numberOfCircles) => {
  let array = [];
  _.times(numberOfCircles, (i) => {
    array.push(<Circle int={numberOfCircles} key={i} />);
  });
  return array;
};

const scoresRender = (scores) => {
  return scores.map((scores) => {
    return (
      <ScoresListItem key={scores[0]}>
        <ScoresDiv int={scores[1]}>{handleCircles(scores[1])}</ScoresDiv>
        <ScoresCaption>{scores[0].split('_').join(' ')}</ScoresCaption>
        <br></br>
      </ScoresListItem>
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
          <LinedHeading>Method</LinedHeading>
          {/* introduction text to the page*/}
          <LinedSubHeading>Scores</LinedSubHeading>
          {/* [OOOOO   Excellent
               OOOO    Very Good
               etc] */}
            <div>{ethicsRender(ethics)}</div>
          <LinedSubHeading>Criteria</LinedSubHeading>
          {/* render rest of the page here */}


        </main>
        <footer style={{marginBottom: '1rem'}}>
          <Socials />
        </footer>
      </StyledSection>
    </>
  );
};

// export async function getServerSideProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scorings`);
//   const json = await res.json();
//   return { props: { content: json } };
// }

Scoring.propTypes = {
  content: PropTypes.array,
};
export default scoring;
