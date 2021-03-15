import styled, { keyframes } from 'styled-components';
import css from 'styled-jsx/css'



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
  marginLeft: -125;
`;

export { LinedHeading, StyledSection, StyledLink, StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel};
