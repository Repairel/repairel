import styled from "styled-components";

const CompareWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  min-height: 150px;
  @media (min-width: 750px) {
    width: 48.2%;
    margin-right: 1rem;
    float: right;
  }
`;

const Instructions = styled.p`
  margin: 0;
  padding: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
`;

export { CompareWrapper, Instructions };
