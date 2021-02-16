import Header from "@components/header";
import Head from "next/head";
import PropTypes from "prop-types";
import getConfig from 'next/config'
import { useState } from 'react'
import { LinedHeading } from "../styles/global";
import {ProductRequest} from '@components/product/Product.style.js';
import React from "react";
import {Row, Wishlist_Row} from '../styles/global';
//import { parseCookies  } from 'nookies'

const { publicRuntimeConfig } = getConfig();

function ProductReq () {
  // Get the user input from the fields
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Brand, setBrand] = useState('')
  const [Size, setSize] = useState('')
  const [Type, setType] = useState('')
  const [OtherSpecifications, setOtherSpecifications] = useState('')

  //Function that gets excecuted on the click
  async function addRequest() {
    const jwt = parseCookies().jwt

    const reqInfo = {
        name: Name,
        email: Email,
        brand: Brand, 
        size: Size,
        type: Type,
        other_specifications: OtherSpecifications
    }

    const add = await fetch(`${publicRuntimeConfig.API_URL}/product_requests`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqInfo)
    })

    const addResponse = await add.json()

    console.log(addResponse)
    
  }

  return (
    <>
      <Head>
        <title id="title">REPAIREL | Product Request</title>
      </Head>
      <Header />
      <section
        style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
      >
        <LinedHeading>Product request</LinedHeading>
        
      </section>
      
      
      <form> 
          
          <Wishlist_Row><label className='Name' htmlFor="Name" id="wishlist">Name*</label></Wishlist_Row>
          <Wishlist_Row><input type="text" className="Name" onChange={e => setName(e.target.value) } value={Name}/></Wishlist_Row>
          
          <Wishlist_Row><label className='Email' htmlFor="Email">Email*</label></Wishlist_Row>
          <Wishlist_Row><input type="email" className='Email' onChange={e => setEmail(e.target.value) } value={Email}/></Wishlist_Row>

          <div className = "both_col">
          <div className="col1">
          <Row><label className="Brand" htmlFor="Brand" id="parent">Brand</label></Row>
          <Row><input type="text" className="Brand" onChange={e => setBrand(e.target.value) } value={Brand}/></Row>
          </div>
          <div className="col2">
          <Row><label className='Size' htmlFor="Size" id="parent">Size*</label></Row>
          <Row><input type="text" className='Size' onChange={e => setSize(e.target.value) } value={Size} /></Row>
          </div>
          </div>

          <Wishlist_Row><label className="Type" htmlFor="Type">Type*</label></Wishlist_Row>
          <Wishlist_Row><input type="text" className="Type" onChange={e => setType(e.target.value) } value={Type}/></Wishlist_Row>
        
          
          <Wishlist_Row><label className = "OtherSpecifications" htmlFor="OtherSpecifications">Other specifications</label></Wishlist_Row>
          <Wishlist_Row><input type="text" className="OtherSpecifications" onChange={e => setOtherSpecifications(e.target.value) } value={OtherSpecifications}/></Wishlist_Row>
          
          
          <Row><ProductRequest className="submitRequest" onClick={() => addRequest()}>SUBMIT REQUEST</ProductRequest></Row>
          <style jsx>{`
          input {
            border: none;
            border-bottom: 1px solid black;
          }
          input.OtherSpecifications, input.Type, input.Name, input.Email, label.OtherSpecifications,
          label.Type, label.Name, label.Email, label.Brand, label.Size{
            display: flexbox;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
            font-size: 1.25em;
          }
          div.col1 {
            position: relative;
            display:inline-block;
            width: 15vw;
            margin-bottom: 20px;
          }
          div.col2 {
            position: relative;
            display:inline-block;
            width: 15vw;
            margin-bottom: 20px;
          }
          div.both_col, Row.ProductRequest.submitRequest {
            display: flexbox;
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
          }
          input.Brand {
            width: 15vw;
          }
          select.Size {
            width: 14vw;
            height: 1.25em;
            font-size: 1.2em;
          }
      `}</style>
      
        </form>
    </>
  );
};

ProductReq.propTypes = {
  content: PropTypes.array,
};

export default ProductReq;
