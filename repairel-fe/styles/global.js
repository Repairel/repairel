import styled, { keyframes } from 'styled-components';

// This version has linedsubheading


const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const underline = keyframes`
    0% {width: 0px}
    100% {width: 100%}
`;

const LinedHeading = styled.h1`
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid black;
    animation: ${underline} 1s linear;
  }
`;

const LinedSubHeading = styled.h3`
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid black;
    animation: ${underline} 1s linear;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;

const StyledLinkFooter = styled.a`
  text-decoration: none;
  color: gray;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;

const StyledTitle = styled.h2`
  color: black;
  text-transform: sentence;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 1em;
<<<<<<< HEAD
    justify-content: center;
=======
	justify-content: center;
>>>>>>> 1934c03bd6e90cc957e04730ae6ffa823bf5fa72

`;

const Column = styled.div`
  flex: 50%;
  padding: 0 0.5em 0 0.5em;
  justify-content: center;
`;

const StyledButton = styled.button`
  max-width: 100%;
  display: inline-block;
  background: white;
  color: black;
  border: 1px solid black;
  padding-left: 1.5em;
  padding-right: 1.5em;
  letter-spacing: 1px;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 1rem;
  height: 2rem;
  line-height: 1rem;
  padding-bottom: auto;
  padding-top: auto;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const StyledInput = styled.input`
  font-size: 1.25em;
  border-radius: 0em;
  background-color: white;
  border: 0px solid grey;
  border-bottom: 2px solid grey;
`;

const StyledFormLabel = styled.span`
  font-size: 1.25em;
<<<<<<< HEAD
  margin-left: -125;
`;

export { LinedHeading, LinedSubHeading, StyledSection, StyledLink, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel};
=======
`;

const ProfileListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.7rem;

  margin: -0.5px;
  text-align: center;
`;
const ProfileImage = styled.img`
  align-self: start;
  height: 200px;
  width: auto;
`;
const ProfileCaption = styled.p`
  text-transform: capitalize;
  font-size: 2em;
`;

const ProfileList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, max-content);
  @media (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: max-content;
  }
  @media (max-width: 350px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export { LinedHeading, StyledSection, StyledLink, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel, ProfileCaption, ProfileListItem, ProfileImage, ProfileList };
>>>>>>> 1934c03bd6e90cc957e04730ae6ffa823bf5fa72
