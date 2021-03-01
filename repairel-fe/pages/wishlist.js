import Header from "@components/header";
import Head from "next/head";
//import getConfig from 'next/config'
import { useState } from 'react'
import { LinedHeading} from "../styles/global";
import React from "react";
import {Row} from '../styles/global';

export default function ProductReq () {
  // Get the user input from the fields
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Brand, setBrand] = useState('')
  const [Size, setSize] = useState('')
  const [Type, setType] = useState('')
  const [OtherSpecifications, setOtherSpecifications] = useState('')
  
  //Send the request on click of submit button
  async function addRequest() {
    const reqInfo = {
        Name: Name,
        Email: Email,
        Brand: Brand,
        OtherSpecifications: OtherSpecifications,
        Type: Type,
        Size: Size
    }

    // Hard coded link
    const add = await fetch('https://rocky-earth-77368.herokuapp.com/product-requests', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqInfo),
      
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
      <form method="post" name="Form" action=""> 
          <Row><label className="Name" htmlFor="Name">Name*</label></Row>
          <Row><input type="text" className="Name" onChange={e => setName(e.target.value) } value={Name} required/></Row>
          
          <Row><label className='Email' htmlFor="Email">Email*</label></Row>
          <Row><input type="email" className='Email' onChange={e => setEmail(e.target.value) } value={Email} required/></Row>

          <div className = "both_col">
          <div className="col1">
          <Row><label className="Brand" htmlFor="Brand" id="parent">Brand</label></Row>
          <Row><input type="text" className="Brand" onChange={e => setBrand(e.target.value) } value={Brand}/></Row>
          </div>
          <div className="col2">
          <Row><label className='Size' htmlFor="Size" id="parent">Size*</label></Row>
          <Row><input type="text" className='Size' onChange={e => setSize(e.target.value) } value={Size} required/></Row>
          </div>
          </div>

          <Row><label className="Type" htmlFor="Type">Type*</label></Row>
          <Row><input type="text" className="Type" onChange={e => setType(e.target.value) } value={Type} required/></Row>
        
          <Row><label className = "OtherSpecifications" htmlFor="OtherSpecifications">Other specifications</label></Row>
          <Row><textarea type="text" className="OtherSpecifications" onChange={e => setOtherSpecifications(e.target.value) } value={OtherSpecifications}/></Row>
          
          <Row><button type="submit" className="submitRequest" onClick={() => addRequest()}>SUBMIT REQUEST</button></Row>
        </form>
    </>
  );
}
