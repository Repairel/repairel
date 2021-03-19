import { CompareWrapper, Instructions, Checkbox, StyledInput, StyledLabel } from "./CompareInstructions.style";

const CompareInstructions = () => {
  return (
    <CompareWrapper>
      <Instructions>
        Compare two shoes by checking the
        <br/>
        <StyledLabel htmlFor="example" style={{ display: "inline-block" }}>
          <StyledInput checked type="checkbox" id="example" name="example" />
          Compare
        </StyledLabel>
        <br/>
        below the product

      </Instructions>
    </CompareWrapper>
  );
};
export default CompareInstructions;
