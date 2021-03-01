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
import React, { useState, useEffect, useContext } from "react";

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
  ButtonContainer,
  EthicsDescList,
  EthicsDesc,
  RefLink
} from './Product.style';

const Product = ({ product, url, esdes }) => {
  const [desc, setDesc] = useState({ name: esdes[0].esname.split('_').join(' ').toUpperCase(), text: esdes[0].description });

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
  const handleCircles = (int, name, text) => {
    let array = [];
    _.times(int, (i) => {
      array.push(<Circle data-name={name} data-text={text} int={int} key={i} />);
    });
    return array;
  };

  let [active, setActive] = useState(0)

  function changeDesc(id, name, desc) {
    setDesc({ name: name, text: desc });
    setActive(id);
  }

  const activeStyle = {
    backgroundColor: '#ecf0f1',
  }

  const ethicsRender = (ethics) => {
    let counter = 0
    return ethics.map((ethic) => {
      let curName = esdes[counter].esname.split('_').join(' ').toUpperCase();
      return (
        <EthicsListItem style={counter == active ? activeStyle : {}} id={counter} data-name={curName} data-text={esdes[counter].description} key={ethic[0]} onClick={(e) => changeDesc(e.target.id, e.target.dataset.name, e.target.dataset.text)}>
          <EthicsImage id={counter} data-name={curName} data-text={esdes[counter].description} src={ethic[2]} />
          <EthicsCaption id={counter} data-name={curName} data-text={esdes[counter].description}>{ethic[0].split('_').join(' ')}</EthicsCaption>
          <CircleDiv id={counter} data-name={curName} data-text={esdes[counter].description} int={ethic[1]}>{handleCircles(ethic[1], curName, esdes[counter++].description)}</CircleDiv>
        </EthicsListItem>
      );
    });
  };

  function hasStock() {
    if (product.stock) {
      if (product.stock == -1) {
        return <span></span>
      }
      return <span>{product.stock} currently in stock</span>
    }
    return <span>Fill in this form and be the first to know when we have stock <a href="#">here</a></span>;
  }

  function cartButton() {
    if (product.stock) {
      if (product.stock == -1 ) {
        return <RefLink href={product.affiliate_link} target="_blank">affiliate link</RefLink>
      }
      return <AddToCart className='snipcart-add-item product__button' data-item-id={product.id} data-item-name={product.name} data-item-price={product.price} data-item-url={`https://84b827bf9943.ngrok.io${url}`} data-item-image={product.images[0].url} data-item-custom1-name='Size' data-item-custom1-options={product.Size}>Add to cart</AddToCart>
    } else {
      return <SoldOut>Sold Out</SoldOut>
    }
  }

  return (
    <>
      <Slider images={product.images} />
      <div className='product' style={{ padding: '1rem' }}>
        <MainInfo>
          <div>
            <ProductTitle className='product__title'>
              {product.name} <ProductSize>/ size {product.Size}</ProductSize>
            </ProductTitle>
            <p className='product__price'>£ {product.price}</p>
          </div>

        </MainInfo>
        <ButtonContainer className='product__price-button-container'>
          {cartButton()}
          {hasStock()}
          {/* <a href={`mailto:repairelhub@gmail.com?subject=Wishlist&body=I would like to add ${product.name} to my wishlist`}>
          <Wishlist>Add to wishlist</Wishlist>
          </a> */}
        </ButtonContainer>
        <ProductHeading>Description</ProductHeading>
        <p className='product__description'>{product.description}</p>
        <ProductHeading>Ethics and Sustainability</ProductHeading>
        <EthicsList>{ethicsRender(ethics)}</EthicsList>
        <EthicsDesc><b>{desc.name}</b> {desc.text}</EthicsDesc>
      </div>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  url: PropTypes.string,
};
export default Product;
