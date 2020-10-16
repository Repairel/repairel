import { CompareWrapper, Instructions } from "./CompareInstructions.style";

const CompareInstructions = () => {
  return (
    <CompareWrapper>
      <Instructions>
        Compare two shoes by checking the {" "}
        <label htmlFor="example" style={{ display: "inline-block" }}>
          <input disabled checked type="checkbox" id="example" name="example" />
          Compare
        </label>{" "}
        below the product info
      </Instructions>
    </CompareWrapper>
  );
};
export default CompareInstructions;
