import styled, { keyframes } from 'styled-components';

// Div that holds circles
const ScoresDiv = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
`;

// holds each line of the scores categories
const ScoresListItem = styled.li`
  display: flex;
  flex-direction: row;

  padding: 1px;

`;
// scores category
const ScoresCaption = styled.p`
  text-transform: capitalize;
  margin: 5px;
`;

const CriteriaDiv = styled.div`
  display: flex;
  align-items: start;
  width: 260px;
`;

const CriteriaListItem = styled.li`
  display: flex;
  flex-direction: row;
  padding: 0.7rem;
  margin: -0.5px;
`;

const CriteriaText = styled.p`
  display: flex;
  align-items: start;
  width: 700px;
`;

const CriteriaImage = styled.img`
  align-self: start;
  padding-right: 15px;
`;

const CriteriaLine = styled.hr`
  width: 50%; 
  text-align: left; 
  margin-left: 0;
`;

export {ScoresDiv, ScoresListItem, ScoresCaption, CriteriaDiv, CriteriaListItem, CriteriaText, CriteriaImage, CriteriaLine};
