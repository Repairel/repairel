import Header from "@components/header";
import Head from "next/head";
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
  
  // Function to send the request on click of submit button
  async function addRequest() {
    const reqInfo = {
      Name: Name,
      Email: Email,
      Brand: Brand,
      OtherSpecifications: OtherSpecifications,
      Type: Type,
      Size: Size
  }  
  // The form will only get submitted if required fields are not empty.
  if (document.getElementById("Name").value == ""  || document.getElementById("Email").value == "" || document.getElementById("Size").value == "" || document.getElementById("Type").value == "") {
    document.getElementById("FormNonSuccessMessage").innerHTML = "Please make sure to fill in all of the required fields marked with an asterix(*)."
   }
   else {
    const add = await fetch('https://rocky-earth-77368.herokuapp.com/product-requests', { // Hard coded link due to a bug otherwise
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqInfo),
    })
    const addResponse = await add.json()
    console.log(addResponse)
    document.getElementById("FormSuccessMessage").innerHTML = "Thank you for submitting your request. We will be in touch when the product you requested comes back into stock."
    document.getElementById("Form").style.display="none";
  }
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
        <LinedHeading>PRODUCT REQUEST</LinedHeading>
        
      </section>     
      <p id="FormSuccessMessage"></p>
      <p id="FormNonSuccessMessage"></p>
      <form method="post" id="Form" name="Form" action=""> 
          <Row><label className="Name" htmlFor="Name">Your name*</label></Row>
          <Row><input type="text" className="Name" id="Name" onChange={e => setName(e.target.value) } value={Name}/></Row>
          
          <Row><label className='Email' htmlFor="Email">Email*</label></Row>
          <Row><input type="email" id="Email" className='Email' onChange={e => setEmail(e.target.value) } value={Email}/></Row>

          <div className = "both_col">
          <div className="col1">
          <Row><label className="Brand" htmlFor="Brand" id="parent">Brand</label></Row>
          <Row><input type="text" className="Brand" onChange={e => setBrand(e.target.value) } value={Brand}/></Row>
          </div>
          <div className="col2">
          <Row><label className='Size' htmlFor="Size" id="parent">Size*</label></Row>
          <Row><input type="text" id="Size" className='Size' onChange={e => setSize(e.target.value) } value={Size}/></Row>
          </div>
          </div>

          <Row><label className="Type" htmlFor="Type">Style of shoe*</label></Row>
          <Row><input type="text" id="Type" className="Type" onChange={e => setType(e.target.value) } value={Type} placeholder="Example: boot, sneaker, flap.."/></Row>
        
          <Row><label className = "OtherSpecifications" htmlFor="OtherSpecifications">Other specifications</label></Row>
          <Row><textarea type="text" className="OtherSpecifications" onChange={e => setOtherSpecifications(e.target.value) } value={OtherSpecifications}/></Row>
          
          <Row><button type="button" id="button" className="submitRequest" onClick={() => addRequest()}>SUBMIT REQUEST</button></Row>
        </form>
    </>
  );
}
