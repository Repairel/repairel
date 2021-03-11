import PropTypes from 'prop-types';
import AppContext from "../../context/AppContext";
import _ from 'lodash';
import { useState, useContext } from "react";
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
  const appContext = useContext(AppContext);

  let [ added, setAdded ] = useState(false);
  let [ wishlistID, setWishlistID ] = useState(-1);
  let [clicked, setClicked] = useState(false);

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

  const ethicsRender = (ethics) => {
    return ethics.map((ethic) => {
      return (
        <EthicsListItem key={ethic[0]}>
          <EthicsImage src={ethic[2]} />
          <EthicsCaption>{ethic[0].split('_').join(' ')}</EthicsCaption>
          <CircleDiv int={ethic[1]}>{handleCircles(ethic[1])}</CircleDiv>
        </EthicsListItem>
      );
    });
  };

  const ethicsDescList = (esdes) => {
    return esdes.map((es) => {
      return (
        <EthicsDesc><b>{es.esname.split('_').join(' ').toUpperCase()}</b> {es.description}</EthicsDesc>
      )
    })
  }

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

  async function addWishlist() {
    const userID = appContext.user.id;
    const productID = product.id;

    if (!added) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, { user: [userID], product: [productID] })
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
          {hasLogin()}
        </ButtonContainer>
        <ProductHeading>Description</ProductHeading>
        <p className='product__description'>{product.description}</p>
        <ProductHeading>Ethics and Sustainability</ProductHeading>
        <EthicsList>{ethicsRender(ethics)}</EthicsList>
        <EthicsDescList>{ethicsDescList(esdes)}</EthicsDescList>
      </div>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  url: PropTypes.string,
};
export default Product;
