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
import Markdown from "markdown-to-jsx";
import styles from "./Product.module.css";

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
  const [desc, setDesc] = useState({ name: "",text: "", image: ""});
  let [active, setActive] = useState(-1)
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
  const handleCircles = (int, name, text, id) => {
    let array = [];
    _.times(int, (i) => {
      array.push(<Circle className={id==active? styles.circle : ""} data-name={name} data-text={text} int={int} key={i} />);
    });
    return array;
  };


  function changeDesc(id, name, desc, image) {
    setDesc({ name: name, text: desc, image:image });
    setActive(id);
  }



  const activeStyle = {
    backgroundColor: '#FFFFFF',
  }

  const ethicsRender = (ethics) => {
    let counter = 0
    return ethics.map((ethic) => {
      let curName = esdes[counter].esname.split('_').join(' ').toUpperCase();
      return (
        <EthicsListItem className={counter == active ? styles.active: styles.default} style={counter == active ? activeStyle : {}} id={counter} data-name={curName} data-text={esdes[counter].description} key={ethic[0]} onClick={(e) => changeDesc(e.target.id, e.target.dataset.name, e.target.dataset.text, ethic[2])}>
          <EthicsImage className={styles.esimage} id={counter} data-name={curName} data-text={esdes[counter].description} src={ethic[2]} />
          <EthicsCaption id={counter} data-name={curName} data-text={esdes[counter].description}>{ethic[0].split('_').join(' ')}</EthicsCaption>
          <CircleDiv id={counter} data-name={curName} data-text={esdes[counter].description} int={ethic[1]}>{handleCircles(ethic[1], curName, esdes[counter].description, counter++)}</CircleDiv>
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
      return <AddToCart className='snipcart-add-item product__button' data-item-id={product.id} data-item-name={product.name} data-item-price={product.price} data-item-url={`https://dev-repairel-fe.herokuapp.com${url}`} data-item-image={product.images[0].url} data-item-custom1-name='Size' data-item-custom1-options={product.Size}>Add to cart</AddToCart>
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
        <EthicsDesc><div><img style={{height:20, marginRight:5}} src={desc.image}></img><b>{desc.name}</b></div><div><Markdown>{desc.text}</Markdown></div></EthicsDesc>
      </div>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  url: PropTypes.string,
};
export default Product;
