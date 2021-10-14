import styled, { keyframes } from 'styled-components';

// This version has linedsubheading

const Font = styled.html`
  font-family: 'Vazir', sans-serif;
`;

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
  font-size: 1.5em;
  text-align:center;
  padding-bottom: 1rem;
  position: relative;
  text-transform: uppercase;
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

const Subtitle = styled.p`
  max-width: 100%;
  margin:auto;
  vertical-align: middle;
  position: relative;
  color: black;
  letter-spacing: 1px;
  font-size: 1rem;
  height: 1rem;
  line-height: 1rem;
  padding-top: auto;
  font-weight: 400;
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

const StyledLinkHeader = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    color: white;
    transition: all ease 0.2s
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
  justify-content: center;
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
    filter: invert(100%);
    border: 2px solid white;
  }
`;

const SurveyStyledButton = styled.button`
  max-width: 100%;
  display: inline-block;
  background: #000000;
  color: white;
  border: 1px solid black;
  padding-left: 1.5em;
  padding-right: 1.5em;
  letter-spacing: 1px;
  border-radius: 10px;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 1rem;
  height: 2rem;
  line-height: 1rem;
  padding-bottom: auto;
  padding-top: auto;
  &:hover {
    filter: invert(100%);
    border: 2px solid white;
  }
`;

const StyledAnimatedButton = styled.button`
  width: 4rem;
  max-width: 100%;
  display: inline-block;
  background: white;
  color: black;
  border: 1px solid black;
  height: auto;
  width: auto;
  margin: 0.5rem;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 0.8rem;
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
  margin-left: -125;
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
  height: 150px;
  width: auto;
`;
const ProfileCaption = styled.p`
  text-transform: capitalize;
  font-size: 1.5em;
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

const Login = styled.a`
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;

const Register = styled.a`
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;

export { SurveyStyledButton, Subtitle, Font, Register, LinedHeading, LinedSubHeading, StyledSection, StyledLink, StyledLinkHeader, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel, ProfileCaption, ProfileListItem, ProfileImage, ProfileList, Login, StyledAnimatedButton };
