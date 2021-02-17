import Header from "@components/header";
import Head from "next/head";
import PropTypes from "prop-types";
import getConfig from 'next/config'
import { useState } from 'react'
import { LinedHeading } from "../styles/global";
import {ProductRequest} from '@components/product/Product.style.js';
import React from "react";
import {Row} from '../styles/global';
import { parseCookies } from 'nookies'

const { publicRuntimeConfig } = getConfig();

function ProductReq () {
  // Get the user input from the fields
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Brand, setBrand] = useState('')
  const [Size, setSize] = useState('')
  const [Type, setType] = useState('')
  const [OtherSpecifications, setOtherSpecifications] = useState('')

  //Send the request on click of submit button
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

    const add = await fetch(`${publicRuntimeConfig.API_URL}/Product-requests`, {
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
          <Row><label className="Name" htmlFor="Name">Name*</label></Row>
          <Row><input type="text" className="Name" onChange={e => setName(e.target.value) } value={Name}/></Row>
          
          <Row><label className='Email' htmlFor="Email">Email*</label></Row>
          <Row><input type="email" className='Email' onChange={e => setEmail(e.target.value) } value={Email}/></Row>

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

          <Row><label className="Type" htmlFor="Type">Type*</label></Row>
          <Row><input type="text" className="Type" onChange={e => setType(e.target.value) } value={Type}/></Row>
        
          <Row><label className = "OtherSpecifications" htmlFor="OtherSpecifications">Other specifications</label></Row>
          <Row><textarea type="text" className="OtherSpecifications" onChange={e => setOtherSpecifications(e.target.value) } value={OtherSpecifications}/></Row>
          
          <Row><ProductRequest className="submitRequest" onClick={() => addRequest()}>SUBMIT REQUEST</ProductRequest></Row>
        </form>
    </>
  );
};

ProductReq.propTypes = {
  content: PropTypes.array,
};

export default ProductReq;
