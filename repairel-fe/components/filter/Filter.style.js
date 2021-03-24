import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem 0;
  background-color: white;
  border: 1px solid black;
  @media (min-width: 750px) {
    width: 48.2%;
    margin-left: 1rem;
  }
`;

const FilterDiv = styled.div`
  padding-bottom:1em;
  margin: 0.5rem 0 0 0;
  text-transform: capitalize;

`;

const FilterLabel = styled.label`
  margin-right: 1.3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  @media (mix-width: 750px) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FilterInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  &:checked + ${FilterLabel} {
    text-decoration: underline;
  }
`;

const FilterHeadings = styled.h5`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  
`;

const FilterMessage = styled.p`
  margin-top: 0;
  text-align: center;
`

const ClearAll = styled.button`
  margin-bottom: 1rem;
  width: 4rem;
  max-width: 100%;
  display: inline-block;
  background: white;
  color: black;
  border: 1px solid black;
  height: auto;
  width: auto;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  &:hover {
    color: white;
    background-color: black;
  }
`;


export {
  FilterWrapper,
  FilterDiv,
  FilterHeadings,
  FilterInput,
  FilterLabel,
  FilterMessage,
  ClearAll,
};
