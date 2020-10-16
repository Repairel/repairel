import styled from "styled-components";

const SocialsList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 10.5rem;
  margin: 0 auto;
`;

const SocialsListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
`;

export { SocialsList, SocialsListItem };
