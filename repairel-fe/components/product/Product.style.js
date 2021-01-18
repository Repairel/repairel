import styled from "styled-components";

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
`;
const ProductTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 300;
`;
const ProductSize = styled.span`
  font-weight: 200;
  font-size: 1rem;
`;
const AddToCart = styled.button`
  width: 4rem;
  max-width: 100%;
  display: inline-block;
  background: white;
  color: black;
  border: 1px solid black;
  height: auto;
  width: auto;
  margin: 0.5rem;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 0.8rem;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const SoldOut = styled.button`
  width: 4rem;
  max-width: 100%;
  display: inline-block;
  background: white;
  color: lightgrey;
  border: 1px solid lightgrey;
  height: auto;
  width: auto;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const Wishlist = styled.button`
  width: 4rem;
  max-width: 100%;
  display: inline-block;
  background: white;
  color: black;
  border: 1px solid black;
  height: auto;
  width: auto;
  margin: 0.5rem;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 0.8rem;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const ProductRequest = styled.button`
  width: 4rem;
  max-width: 100%;
  background: white;
  color: black;
  border: 1px solid black;
  height: auto;
  width: auto;
  margin: 0.5rem;
  margin-top: 30px;
  padding: 0.6em 3em;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 1px;
  vertical-align: top;
  border-radius: 0;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;
  text-transform: uppercase;
  font-size: 0.8rem;
  &:hover {
    color: white;
    background-color: black;
  }
  position: relative;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;


const ButtonContainer = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SliderImage = styled.img`
  max-width: 400px;
  margin-right: 0.5rem;
  max-height: 400px;
`;

const SliderContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

const EthicsList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, max-content);
  @media (min-width: 750px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: max-content;
  }
  @media (max-width: 350px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EthicsListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.7rem;
  border: 1px solid black;
  margin: -0.5px;
`;
const EthicsImage = styled.img`
  align-self: start;
`;
const EthicsCaption = styled.p`
  text-transform: capitalize;
`;
const ProductHeading = styled.h3`
  font-size: 1.05rem;
  font-weight: 500;
  margin-top: 2.5rem;
`;

export {
  AddToCart,
  SliderImage,
  SliderContainer,
  MainInfo,
  SoldOut,
  EthicsList,
  EthicsListItem,
  EthicsImage,
  EthicsCaption,
  ProductTitle,
  ProductSize,
  ProductHeading,
  Wishlist,
  ButtonContainer,
  ProductRequest

};
