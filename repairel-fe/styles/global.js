import styled, { keyframes } from 'styled-components';




const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 85vh;
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

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
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
  border: 2px solid grey;
  
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
  marginLeft: -125;
  
  
 
`;

export { LinedHeading, StyledSection, StyledLink, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel };
