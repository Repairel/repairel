import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import AppContext from "../context/AppContext";
import { useContext, Fragment } from "react";
import { useRouter } from "next/router";

import { isLogged } from "../lib/auth"

import { LinedHeading, StyledSection, Row, Column } from '../styles/global';

import axios from 'axios';
import Cookie from "js-cookie";

const Orders = ({ content }) => {
    if(Object.keys(content).length == 0){
      return(
        <>
        <Head>
          <title id='title'>REPAIREL | Orders</title>
        </Head>
        <Header />
        <StyledSection>
          <main style={{ margin: '1rem' }}>
            <LinedHeading>Orders</LinedHeading>
            <Row>
              <Column style={{ textAlign: 'right', marginLeft: -830}}>No orders found!</Column>
            </Row>
          </main>
          <footer style={{marginBottom: '1rem'}}>
            <Socials />
          </footer>
        </StyledSection>
      </>
      )
    }

    return (
      <>
        <Head>
          <title id='title'>REPAIREL | Orders</title>
        </Head>
        <Header />
        <StyledSection>
          <main style={{ margin: '1rem' }}>
            <LinedHeading>Orders</LinedHeading>
            <Row>
              <Column style={{ textAlign: 'right', marginLeft: -830}}>Order no: </Column>
              <Column style={{ textAlign: 'left' }}>{content[0].order_no}</Column>
            </Row>
            <Row>
              <Column style={{ textAlign: 'right', marginLeft: -830}}>Product: </Column>
              <Column style={{ textAlign: 'left' }}>{content[0].products[0].name}</Column>
            </Row>
            <Row>
              <Column style={{ textAlign: 'right', marginLeft: -830}}>Total: </Column>
              <Column style={{ textAlign: 'left' }}>{content[0].total}</Column>
            </Row>
            {/*
            <Row>
              <Column style={{ textAlign: 'right', marginLeft: -830}}>Order no: </Column>
              <Column style={{ textAlign: 'left' }}>{content[1].order_no}</Column>
            </Row>
            <Row>
              {orders}
            </Row>
            */}
          </main>
          <footer style={{marginBottom: '1rem'}}>
            <Socials />
          </footer>
        </StyledSection>
      </>
    );
};

export async function getServerSideProps(context) {
    
    const parsedItems = {};
    var return_json = {};

    if (context.req.headers.cookie) {
      const cookiesItems = context.req.headers.cookie.split('; ');
      cookiesItems.forEach(cookies => {
        const parsedItem = cookies.split('=');
        parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
      });
    }

    const token = parsedItems['token']

    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("token");
        }
        const user = await res.json();
        
        //First, we need to check if we need to update snipcart_personas, and if so do that
        if(user.snipcart_update_needed){
          const res = await fetch(`https://app.snipcart.com/api/customers?email=${user.email}`, {headers: {
            'Authorization': 'Basic ' + Buffer.from("ST_MmI5YTU0MjUtZjA2ZS00ZTcwLTk5ZjYtNWZmOGQ5ZTIwYTc5NjM3NTAxMTY5MDI2NDA4NTY0:").toString('base64'), //API key currently hardcoded
            'Accept': 'application/json'
          }});
          const json = await res.json();
          if(json.items.length != 0){ //This seems to be a good "no customer found" check; items contains customer info
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/snipcart-personas`, {user: user.id, customer_id: json.items[0].id}, { headers: { Authorization: `Bearer ${token}` } }) //add snipcart customer ID to snipcart_personas
            axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {snipcart_update_needed: false}, { headers: { Authorization: `Bearer ${token}` } }) //prevent fetching/storing snipcart customer ID in future, until repairel email is changed
          }
        }

        //We potentially have a single user having multiple snipcart personas. For each persona, there can be multiple orders, and each order may have multiple products
        
        var response_json = {};

        for(var i = 0; i < user.snipcart_personas.length; i++){ //Iterate through all personas
          //Get all the orders for a persona
          const res1 = await fetch(`https://app.snipcart.com/api/customers/${user.snipcart_personas[i].customer_id}/orders`, {headers: {
            'Authorization': 'Basic ' + Buffer.from("ST_MmI5YTU0MjUtZjA2ZS00ZTcwLTk5ZjYtNWZmOGQ5ZTIwYTc5NjM3NTAxMTY5MDI2NDA4NTY0:").toString('base64'), //API key currently hardcoded
            'Accept': 'application/json'
          }});
          const json1 = await res1.json(); //This may contain multiple orders

          for(var j = 0; j < json1.length; j++){ //For each order, add its order info to the response
            var k = Object.keys(response_json).length;
            response_json[k] = {  order_no: json1[j].token, 
                                  shipping_address: { 
                                    name: json1[j].shippingAddressName, 
                                    line_1: json1[j].shippingAddressAddress1, 
                                    line_2: json1[j].shippingAddressAddress2, 
                                    city: json1[j].shippingAddressCity, 
                                    county: json1[j].shippingAddressProvince, 
                                    country: json1[j].shippingAddressCountry,
                                    postcode: json1[j].shippingAddressPostalCode,
                                    phone: json1[j].shippingAddressPhone
                                  },
                                  billing_address: { 
                                    name: json1[j].billingAddressName, 
                                    line_1: json1[j].billingAddressAddress1, 
                                    line_2: json1[j].billingAddressAddress2, 
                                    city: json1[j].billingAddressCity, 
                                    county: json1[j].billingAddressProvince, 
                                    country: json1[j].billingAddressCountry,
                                    postcode: json1[j].billingAddressPostalCode,
                                    phone: json1[j].billingAddressPhone
                                  },
                                  payment_method: json1[j].paymentMethod,
                                  total: json1[j].finalGrandTotal,
                                  date: json1[j].creationDate,
                                  products: {} 
                                };

            //Obtain the order info containing product info
            const res2 = await fetch(`https://app.snipcart.com/api/orders/${json1[j].token}`, {headers: {
              'Authorization': 'Basic ' + Buffer.from("ST_MmI5YTU0MjUtZjA2ZS00ZTcwLTk5ZjYtNWZmOGQ5ZTIwYTc5NjM3NTAxMTY5MDI2NDA4NTY0:").toString('base64'), //API key currently hardcoded
              'Accept': 'application/json'
            }});
            const json2 = await res2.json(); //This contains all products in the order
            
            //Iterate through each product, adding product info to the response
            for(var l = 0; l < json2.items.length; l++){
              response_json[k].products[l] = { name: json2.items[l].name, price: json2.items[l].price };
            }

            
          }
        }

        return_json = response_json;
      });
    }
    else{
      context.res.writeHead(302, { Location: '/login' }); //Redirect to index page
      context.res.end();
    }
    
    return { props: { content: return_json } };
}



Orders.propTypes = {
    content: PropTypes.object,
};
export default Orders;
  