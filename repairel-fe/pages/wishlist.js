import Header from "@components/header";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import getConfig from 'next/config'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import { LinedHeading } from "../styles/global";
import {ProductRequest} from '@components/product/Product.style.js';
const { publicRuntimeConfig } = getConfig();
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Component } from 'react';
import document from 'next/document'

const ProductReq = ({ content }) => {
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

  //const form = document.querySelector('Container.form');

  //form.addEventListener('load', () => {

    // Via Query parameters - GET
    /* const params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    const surname = params.get('surname'); */
  
    // Via local Storage
    /* const name = localStorage.getItem('NAME');
    const surname = localStorage.getItem('SURNAME'); */
    
  //  const name = sessionStorage.getItem('TYPE');
    
  //  form.getElementById('name').innerHTML = Type;
  //}) 

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
        <Markdown>{content[0].about}</Markdown>
        
      </section>
      
      <Container>

      <form> 
          <Row>
          <Row><label className='Name' for="Name">Name*</label></Row>
          <input type="text" className="Name" onChange={e => setName(e.target.value) } value={Name}/>
          </Row>

          <Row>
          <Row><label className='Email' for="Email">Email*</label></Row>
          <input type="email" className='Email' onChange={e => setEmail(e.target.value) } value={Email}/>
          </Row>

          <div className = "both_col">
          <div className="col1">
          <Row><label className="Brand" for="Brand" id="parent">Brand</label></Row>
          <Row><input type="text" className="Brand" onChange={e => setBrand(e.target.value) } value={Brand}/></Row>
          </div>

          <div className="col2">
          <Row><label className='Size' for="Size" id="parent">Size*</label></Row>
          <Row><select type="text" className='Size' onChange={e => setSize(e.target.value) } value={Size} placeholder='Choose...'>
            <option value="First Choice">Choose...</option>
            <option value="Second Choice">10.5</option>
          </select></Row>
          </div>
          </div>

          <Row>
          <Row><label className="Type" for="Type">Type*</label></Row>
          <input type="text" className="Type" onChange={e => setType(e.target.value) } value={Type}/>
          </Row>
          
          <Row>
          <label className = "OtherSpecifications" for="OtherSpecifications">Other specifications</label>
          <input type="text" className="OtherSpecifications" onChange={e => setOtherSpecifications(e.target.value) } value={OtherSpecifications}/>
          </Row>

          <Row><ProductRequest className="submitRequest" onClick={() => addRequest()}>Submit request</ProductRequest></Row>
          <style jsx>{`
          input {
            border: none;
            border-bottom: 1px solid black;
          }
          input.OtherSpecifications, input.Type, input.Name, input.Email, label.OtherSpecifications,
          label.Type, label.Name, label.Email {
            display: flexbox;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
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

          div.both_col {
            display: flexbox;
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
          }

          input.Brand {
            width: 14vw;
          }

      `}</style>
        </form>
        </Container>
    </>
    
    

  );
  
};

export async function getServerSideProps() {
  const res = await fetch(`http://35.178.141.40:1337/abouts`);
  const json = await res.json();
  return { props: { content: json } };
}

ProductReq.propTypes = {
  content: PropTypes.array,
};

export default ProductReq;
