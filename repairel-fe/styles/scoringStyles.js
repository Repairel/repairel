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
  justify-content: space-between;
  padding: 0.7rem;
  margin: -0.5px;
`;
// scores category
const ScoresCaption = styled.p`
  text-transform: capitalize;

`;

const CriteriaDiv = styled.div`
  display: flex;
  align-items: start;
  width: 160px;
`;

const CriteriaListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.7rem;
  margin: -0.5px;
`;

const CriteriaText = styled.p`
  display: flex;
  align-items: start;
  width: 200px;
`;

export {ScoresDiv, ScoresListItem, ScoresCaption, CriteriaDiv, CriteriaListItem, CriteriaText};
