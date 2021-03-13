import styled, { keyframes } from 'styled-components';


const ScoresDiv = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
`;

// needs to be changed 1st thing
const ScoresListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.7rem;
  margin: -0.5px;
`;

const ScoresCaption = styled.p`
  text-transform: capitalize;
`;

export {ScoresDiv, ScoresListItem, ScoresCaption};
