import PropTypes from 'prop-types';
import _ from 'lodash';
import { Rating } from '@components/productInfo/ProductInfo.style';
import { Circle, CircleDiv } from '@components/compare/Compare.style';
import Slider from './Slider';
import Design from "../../public/assembly.svg";
import rawMaterials from "../../public/material.svg";
import materialManufacturing from "../../public/leaf.svg";
import Retail from "../../public/material-processing.svg";
import footwearManufacturing from "../../public/manufacturing.svg";
import Use from "../../public/use.svg";
import Disposal from "../../public/disposal.svg";
import Head from "next/head";

import {
  AddToCart,
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
  ButtonContainer
} from './Product.style';

const Product = ({ product, url, esdes }) => {
  const icons = {
    design: Design,
    raw_materials: rawMaterials,
    material_manufacturing: materialManufacturing,
    footwear_manufacturing: footwearManufacturing,
    retail: Retail,
    use: Use,
    disposal: Disposal,
  };

  const categories = Object.keys(product.ethics_and_sustainability);
  const ethics = [];
  for (let category of categories.slice(1)) {
    ethics.push([
      category,
      product.ethics_and_sustainability[category],
      icons[category] || materialManufacturing,
    ]);
  }
  const handleCircles = (int) => {
    let array = [];
    _.times(int, (i) => {
      array.push(<Circle int={int} key={i} />);
    });
    return array;
  };

  // function changeDescription(dsc) {
  //   document.getElementById("info").innerHTML = dsc;
  // }

  const ethicsRender = (ethics) => {
    let counter = 0;
    return ethics.map((ethic) => {
      console.log(counter);
      // onClick={changeDescription(esdes[counter].description)}
      return (
        <>
          <EthicsListItem id={esdes[counter++].esname}  key={ethic[0]}>
          <EthicsImage src={ethic[2]} />
          <EthicsCaption>{ethic[0].split('_').join(' ')}</EthicsCaption>
          <CircleDiv int={ethic[1]}>{handleCircles(ethic[1])}</CircleDiv>
        </EthicsListItem>

        {/* <span>{esdes[counter++].esname}</span> */}
        
        </>
      );
    });
  };

  function hasStock() {
    if (product.stock) {
      return <span>{product.stock} currently in stock</span>
    }
    return <span>Fill in this form and be the first to know when we have stock <a href="#">here</a></span>;
  }

  return (
    <>
      <Slider images={product.images} />
      <div
        className='product'
        style={{
          padding: '1rem',
        }}
      >
        <MainInfo>
          <div>
            <ProductTitle className='product__title'>
              {product.name} <ProductSize>/ size {product.Size}</ProductSize>
            </ProductTitle>
            <p className='product__price'>£ {product.price}</p>
          </div>
          <Rating title={'Overall ethics rating'} rating={product.rating}>{product.rating}</Rating>
        </MainInfo>
        <ButtonContainer className='product__price-button-container'>
          {product.stock ? (
            <AddToCart
              className='snipcart-add-item product__button'
              data-item-id={product.id}
              data-item-name={product.name}
              data-item-price={product.price}
              data-item-url={`https://84b827bf9943.ngrok.io${url}`}
              data-item-image={product.images[0].url}
              data-item-custom1-name='Size'
              data-item-custom1-options={product.Size}
            >
              Add to cart
            </AddToCart>

          ) : (
            <SoldOut>Sold Out</SoldOut>
          )}
          {hasStock()}
          <a href={`mailto:repairelhub@gmail.com?subject=Wishlist&body=I would like to add ${product.name} to my wishlist`}>
          <Wishlist>Add to wishlist</Wishlist>
          </a>
        </ButtonContainer>
        <ProductHeading>Description</ProductHeading>
        <p className='product__description'>{product.description}</p>
        <ProductHeading>Ethics and Sustainability</ProductHeading>
        <EthicsList>{ethicsRender(ethics)}</EthicsList>
        <div id="info">
            {esdes[0].description}
        </div>
      </div>
      {/* <button>{esdes[0].description}</button> */}
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  url: PropTypes.string,
};
export default Product;
