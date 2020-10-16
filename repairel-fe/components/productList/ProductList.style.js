import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollStyled = styled(InfiniteScroll)`
  margin: 2rem 1rem 1rem 1rem;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  @media (min-width: 750px) {
    grid-template-columns: repeat(3, minmax(300px, 1fr))
  }
`;
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.1s;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  display: block;
`;

const ProductCard = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &:hover ${ProductImage} {
    transform: scale(1.02);
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const SoldOutWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 70px;
  height: 70px;
  background-color: black;
  color: white;
  border-radius: 50%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const OptionsItem = styled.li`
  padding: 0;
  font-size: 1.3rem;
  flex-basis: 50%;
  text-align: center;
  font-weight: 500;
`;
const Checkbox = styled.div`
  display: ${({ toggleCompare }) => (toggleCompare ? 'flex' : 'none')};
  width: 100%;
  padding: 1rem 0;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;
export {
  ProductImage,
  ProductInfoWrapper,
  ProductCard,
  OptionsList,
  OptionsItem,
  SoldOutWrapper,
  ImageWrapper,
  InfiniteScrollStyled,
  Checkbox,
  StyledInput,
  StyledLabel,
};
