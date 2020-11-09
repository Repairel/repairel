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
  text-transform: uppercase;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 1em;
`;

const Column = styled.div`
  flex: 50%;
  padding: 0 0.5em 0 0.5em;
`;

export { LinedHeading, StyledSection, StyledLink, StyledTitle, Row, Column };
