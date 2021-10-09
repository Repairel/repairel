import styled from "styled-components";

const CompareWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  min-height: 150px;
  margin-bottom: 1.5rem;
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

const StyledInput = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const Checkbox = styled.div`
  display: ${({ toggleCompare }) => (toggleCompare ? 'flex' : 'none')};
  width: 100%;
  padding: 1rem 0;
  align-items: center;
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

export { CompareWrapper, Instructions, StyledInput, Checkbox, StyledLabel };
