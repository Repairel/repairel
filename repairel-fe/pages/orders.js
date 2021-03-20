import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import AppContext from "../context/AppContext";
import { useContext, Fragment } from "react";
import { useRouter } from "next/router";

import { isLogged } from "../lib/auth"

import { LinedHeading, StyledSection, Row, Column, StyledTitle } from '../styles/global';

import axios from 'axios';
import Cookie from "js-cookie";

const Orders = ({ content }) => {

  const orders = []; //Holds arrays of JSX for each order
  for(var i = 0; i < Object.keys(content).length; i++){
    const order = [];
    const j = 0;

    order[j] = <React.Fragment><LinedHeading style={{ fontWeight: 500, fontSize: "1.3rem", paddingBottom: "0.5rem" }}>Order {content[i].invoice_no} on {new Date(content[i].date).toDateString()}</LinedHeading></React.Fragment> //Heading of the order


    const shipping_address = [];

    Object.values(content[i].shipping_address).forEach(entry =>
      {
        if(entry !== null && entry !== ""){
          shipping_address.push(entry+"\n");
        }
      }
    );

    const billing_address = [];

    Object.values(content[i].billing_address).forEach(entry =>
      {
        if(entry !== null && entry !== ""){
          billing_address.push(entry+"\n");
        }
      }
    );

    order[j+1] = <React.Fragment>
      <Row>
        <Column style={{ textAlign: 'left', whiteSpace: 'break-spaces' }}>
          Shipped to:{"\n\n"}
          {shipping_address}
          {"\n\n"}
        </Column>
        <Column style={{ textAlign: 'right', whiteSpace: 'break-spaces' }}>
          Billed to:{"\n\n"}
          {billing_address}
          {"\n\n"}
        </Column>
      </Row>
    </React.Fragment>

    const products = []; //An array of JSX for each product in the order

    for(var k = 0; k < Object.keys(content[i].products).length; k++){
      products[k] =
      <React.Fragment>
        <Row>
          <Column style={{ textAlign: 'left'}}>Product {k + 1}: </Column>
        </Row>

        <Row style={{ paddingBottom: 30}}>
          <Column style={{ textAlign: 'left' }}><img src={content[i].products[k].image} style={{ height: 150, width: 150, objectFit: "contain" }}></img></Column>
          <Column>
            <Row style={{ paddingTop: 47 }}>
              <Column style={{ textAlign: 'left', marginLeft: -410}}>{content[i].products[k].name} x{content[i].products[k].quantity}</Column>
            </Row>
            <Row>
              <Column style={{ textAlign: 'left', marginLeft: -410}}>£{content[i].products[k].price}/ea, £{content[i].products[k].total_price} total</Column>
            </Row>
          </Column>
        </Row>
      </React.Fragment>
    }

    order[j+2] = products; //Holds arrays of JSX for each product

    order[j+3] = //Holds JSX of other order info

      <React.Fragment>
        <Row style={{ paddingTop: 20 }}>
            <Column style={{ textAlign: 'left'}}>Snipcart reference: </Column>
            <Column style={{ textAlign: 'left', marginLeft: -800 }}>{content[i].order_no}</Column>
        </Row>
        <Row>
            <Column style={{ textAlign: 'left'}}>Payment method: </Column>
            <Column style={{ textAlign: 'left', marginLeft: -800 }}>{content[i].payment_method}</Column>
        </Row>
        <Row>
            <Column style={{ textAlign: 'left'}}>Date: </Column>
            <Column style={{ textAlign: 'left', marginLeft: -800 }}>{new Date(content[i].date).toDateString()}</Column>
        </Row>
        <Row>
            <Column style={{ textAlign: 'left'}}>Grand total: </Column>
            <Column style={{ textAlign: 'left', marginLeft: -800 }}>£{content[i].total}</Column>
        </Row>
      </React.Fragment>

    orders[i] = order;

  }



  if(Object.keys(content).length == 0){
    return(
      <>
      <Head>
        <title id='title'>REPAIREL | Orders</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>ORDERS</LinedHeading>
          <Row>
            <Column style={{ textAlign: 'left',paddingLeft:0}}>No orders found!</Column>
          </Row>
        </main>

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
          <StyledTitle>ORDERS</StyledTitle>
          {orders}
        </main>

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
            'Authorization': 'Basic ' + Buffer.from(process.env.SNIPCART_TEST_API_KEY).toString('base64'),
            'Accept': 'application/json'
          }});
          const json = await res.json();
          if(json.items.length != 0){ //This seems to be a good "no customer found" check; items contains customer info
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/snipcart-personas`, {user: user.id, customer_id: json.items[0].id}, { headers: { Authorization: `Bearer ${token}` } }) //add snipcart customer ID to snipcart_personas
            axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {snipcart_update_needed: false}, { headers: { Authorization: `Bearer ${token}` } }) //prevent fetching/storing snipcart customer ID in future, until repairel email is changed
          }
        }

        //We now need to check each persona's orders, to add unvisited orders to the databae

        for(var i = user.snipcart_personas.length - 1; i >= 0; i--){ //Iterate through all personas BACKWARDS as most-recent personas are furthest down in the list
          //Get all the orders for a persona
          const res1 = await fetch(`https://app.snipcart.com/api/customers/${user.snipcart_personas[i].customer_id}/orders`, {headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.SNIPCART_TEST_API_KEY).toString('base64'),
            'Accept': 'application/json'
          }});
          const json1 = await res1.json(); //This may contain multiple orders

          for(var j = 0; j < json1.length; j++){ //For each order, add its order info to the response

            //Let's check the visited flag, which tells us if we're put the order into strapi. if it's true we do nothing; if it's false or doesn't exist (a new order), we put it into strapi and make it true
            if(json1[j].metadata == null || json1[j].metadata.visited === undefined || json1[j].metadata.visited == 'false'){ //Hasn't been (successfully) visited, so we'll need to fetch the order data and put it into strapi
              const order_info = {  order_no: json1[j].token,
                                    invoice_no: json1[j].invoiceNumber,
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
                                    date: json1[j].creationDate, //Get a Date representation of date
                                    products: {}
                                  };

              const res2 = await fetch(`https://app.snipcart.com/api/orders/${json1[j].token}`, {headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env.SNIPCART_TEST_API_KEY).toString('base64'),
                'Accept': 'application/json'
              }});
              const json2 = await res2.json(); //This contains all products in the order

              //Iterate through each product, adding product info to the response
              for(var l = 0; l < json2.items.length; l++){
                order_info.products[l] = { name: json2.items[l].name, price: json2.items[l].price, total_price: json2.items[l].totalPrice, quantity: json2.items[l].quantity, image: json2.items[l].image };
              }

              //now put it into strapi under the user's name
              axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {user: user.id, order: order_info}, { headers: { Authorization: `Bearer ${token}` } }) //add snipcart customer ID to snipcart_personas

              //finally update the order's visited flag to reflect addition to the database
              const res3 = await fetch(`https://app.snipcart.com/api/orders/${json1[j].token}`, {headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env.SNIPCART_TEST_API_KEY).toString('base64'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                method: 'PUT',
                body: "{ 'metadata' : { 'visited' : 'true' } }"});
            }
          }
        }

        const all_orders = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user=${user.id}`, { headers: { Authorization: `Bearer ${token}` } })
        for(var z = all_orders.data.length - 1; z >= 0; z--){
          return_json[(all_orders.data.length - 1) - z] = all_orders.data[z].order;
        }

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
