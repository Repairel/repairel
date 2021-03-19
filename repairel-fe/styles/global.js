import styled, { keyframes } from 'styled-components';




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
	justify-content: center;

`;

const Column = styled.div`
  flex: 50%;
  padding: 0 0.5em 0 0.5em;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 0.0em;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  &:hover {
    filter: invert(100%);
    border: 2px solid white;
  }
`;

const StyledInput = styled.input`
  font-size: 1.25em;
  border-radius: 0em
  background-color: white;
  border: 0px solid grey;
  border-bottom: 2px solid grey;
`;

const StyledFormLabel = styled.span`
  font-size: 1.25em;
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

export { Register, LinedHeading, StyledSection, StyledLink, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel, ProfileCaption, ProfileListItem, ProfileImage, ProfileList, Login };
