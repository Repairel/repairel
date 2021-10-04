import styled from 'styled-components';

const ComparisonHeader = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: max-content 3rem;
  grid-column-gap: 0.5rem;
  margin: 1rem;
  @media (min-width: 750px) {
    width: 80%;
    margin: auto;
  }
`;

const ComparisonGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 5rem 1fr;
  grid-template-rows: ${({ length }) => `repeat(${length}, 3rem)`};
  grid-row-gap: 2rem;
  margin: 1rem;
  @media (min-width: 750px) {
    width: 80%;
    margin: 1rem auto;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  align-self: center;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.02);
  }
`;

const Circle = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${({ int, theme }) =>
    int < 3
      ? theme.colors.bad
      : int >= 2 && int < 4
      ? theme.colors.medium
      : theme.colors.good};
  filter: invert(0);
  margin: 2px;
`;

const CircleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EthicsIcon = styled.img`
  margin: 0 auto;
  display: block;
`;
const ArrowIcon = styled.img`
  margin: 0 auto;
  display: block;
  height: 1.5rem;
  margin-top: 0.3rem;
`;
export {
  ComparisonHeader,
  Image,
  Circle,
  ComparisonGrid,
  CircleDiv,
  EthicsIcon,
  ArrowIcon,
  ProductInfo,
};
