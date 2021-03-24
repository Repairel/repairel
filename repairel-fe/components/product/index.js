import PropTypes from 'prop-types';
import AppContext from "../../context/AppContext";
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
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import Markdown from "markdown-to-jsx";
import styles from "./Product.module.css";
import { StyledLink } from "../../styles/global";

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
  RefLink,
  EthicsDesc
} from './Product.style';

const Product = ({ product, url, esdes }) => {
  const appContext = useContext(AppContext);

  let [ added, setAdded ] = useState(false);
  let [ wishlistID, setWishlistID ] = useState(-1);
  let [clicked, setClicked] = useState(false);

  const [desc, setDesc] = useState({ name: "",text: "", image: ""});
  let [active, setActive] = useState(-1)

  const router = useRouter();

  async function checkAdded() {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, { params: { user: [appContext.user.id], product: [product.id] } })
      // worked
      .then(function (response) {
        console.log(response);
        if (response.data.length > 0) {
          setAdded(true);
          setWishlistID(response.data[0].id);
        }
      })
      // didn't work
      .catch(function (error) {
        console.log(error);
      });
  }

  if (appContext.isAuthenticated) {
    checkAdded();
  }

  const icons = {
    design: Design,
    raw_materials: rawMaterials,
    material_manufacturing: materialManufacturing,
    footwear_manufacturing: footwearManufacturing,
    retail: Retail,
    use: Use,
    disposal: Disposal,
  };
var Size=0
if (product.Size===0 && product.kidsSize) {Size=("Kids "+product.kidsSize)}
else if (product.Size===0 && !product.kidsSize) {Size=("Kids Shoe")}
else{Size=product.Size}
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

  function referToForm() {
    // Function to send product type, .. into the local storage so it
    // can be then transferred to the from on product request page
    const name = document.getElementById(product.name).value;
    // to set into local storage
    /* localStorage.setItem("NAME", name);
    localStorage.setItem("SURNAME", surname); */
    sessionStorage.setItem("TYPE", name);
    return;
  };


  function hasStock() {
    if (product.stock) {
      if (product.stock == -1) {
        return <span></span>
      }
      return <span>{product.stock} currently in stock</span>
    }
    return <span>Fill in this form and be the first to know when we have stock <a href="">here</a></span>;
  }

  function cartButton() {
    if (product.stock) {
      if (product.stock == -1 ) {
        return <RefLink href={product.affiliate_link} target="_blank">shop this brand</RefLink>
      }
      return <AddToCart className='snipcart-add-item product__button' data-item-id={product.id} data-item-name={product.name} data-item-price={product.price} data-item-url={`https://dev-repairel-fe.herokuapp.com${url}`} data-item-image={product.images[0].url} data-item-custom1-name='Size' data-item-custom1-options={product.Size}>Add to cart</AddToCart>
    } else {
      return <SoldOut>Sold Out</SoldOut>
    }
  }

  async function addWishlist() {
    const userID = appContext.user.id;
    const productID = product.id;

    if (!added) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, { user: userID, product: productID })
        // worked
        .then(function (response) {
          console.log(response);
          setAdded(true);
          setWishlistID(response.data[0].id);
        })
        // didn't work
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlistID}`)
        // worked
        .then(function (response) {
          console.log(response);
          setAdded(false);
          setWishlistID(-1);
        })
        // didn't work
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  function handleClick() {
    if (!clicked) {
      setClicked(true);
    } else {
      router.push('/login');
    }
  }

  function hasLogin() {
    if (appContext.isAuthenticated) {
      return <Wishlist onClick={() => addWishlist()} style={added == true ? { backgroundColor: 'black', color: 'white'} : {}}>{!added ? 'Add to' : 'Remove from'} wishlist</Wishlist>
    } else {
      return <Wishlist onClick={() => handleClick()}>{!clicked ? 'Add to wishlist' : 'Login to add to wishlist'}</Wishlist>
    }
  }

  return (

    <>
      <div style={{ marginLeft: "1em", marginRight: "1em" }}>
        <Slider images={product.images} />
      </div>
      <div
        className='product'
        style={{
          padding: '1rem',
        }}
      >
        <MainInfo>
          <div>
            <ProductTitle className='product__title'>

              {product.name} <ProductSize>/ Size: {Size}</ProductSize>
            </ProductTitle>
            <p className='product__price'>£ {product.price}</p>
          </div>

        </MainInfo>
        <ButtonContainer className='product__price-button-container'>
          {cartButton()}
          {hasStock()}
          {hasLogin()}
        </ButtonContainer>
        <ProductHeading>Description</ProductHeading>
        <p className='product__description'>{product.description}</p>
        <br/>
        <StyledLink href="/scoring" style={{ fontSize: "1.05rem", fontWeight: 500, margiTop: "2.5rem" }}>Ethics and Sustainability</StyledLink>
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
