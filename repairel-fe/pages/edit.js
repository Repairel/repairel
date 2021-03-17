import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel } from '../styles/global';
import React, { useState, useEffect, useContext } from "react";
import { edit_details } from "../lib/auth";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { LinedHeading } from "../styles/global";
export default function Edit(user) {
  const router = useRouter();

  if (user) {
    user = user.user;
  } else {
    router.push("/");
  }

  const appContext = useContext(AppContext);
  if (process.browser && !appContext.isAuthenticated) {
    router.push("/"); // redirect if you're already logged in
  }

  const [data, setData] = useState({ username: (user) ? user.email : "", first_name: (user) ? user.first_name : "", second_name: (user) ? user.second_name : "",
    phone_number: (user) ? user.phone_number : "", email: (user) ? user.email : "", snipcart_update_needed: (user) ? user.snipcart_update_needed : "" });
  const [error, setError] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      <Head>
        <title id='title'>REPAIREL | Edit Details</title>
      </Head>
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '0 1em 0 1em'}}>
          <LinedHeading style={{textAlign: 'left'}}>EDIT DETAILS</LinedHeading>

          

          {Object.entries(error).length !== 0 &&
            error.constructor === Object &&
            error.message.map((error) => {
              return (
                <div
                  key={error.messages[0].id}
                  style={{ marginBottom: 10 }}
                >
                  <small style={{ color: "red" }}>
                    {error.messages[0].message}
                  </small>
                </div>
              );
            })
          }

          <Row style={{ paddingTop: '5em'}}>
      			<Column style={{ textAlign: 'right'}}>
              <StyledFormLabel>First Name</StyledFormLabel>
            </Column>
            <Column style={{ textAlign: 'left'}}>
      			   <StyledInput
                      required
                      onChange={(e) => setData({ ...data, first_name: e.target.value })}
                      value={data.first_name}
                      type="text"
                      name="first_name" />
      			</Column>
    			</Row>
          <br/>
          <Row>
            <Column style={{ textAlign: 'right'}}>
              <StyledFormLabel>Second Name</StyledFormLabel>
            </Column>
            <Column style={{ textAlign: 'left'}}>
              <StyledInput
               required
               onChange={(e) => setData({ ...data, second_name: e.target.value })}
               value={data.second_name}
               type="text"
               name="second_name"
              />
      			</Column>
    			</Row>
          <br/>
          <Row>
      		  <Column style={{ textAlign: 'right'}}>
              <StyledFormLabel>Phone Number</StyledFormLabel>
            </Column>
            <Column style={{ textAlign: 'left'}}>
      			   <StyledInput
                      required
                      onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                      value={data.phone_number}
                      type="text"
                      name="phone_number" />
      			</Column>
    			</Row>
          <br/>
          <Row>
      			<Column style={{ textAlign: 'right'}}>
              <StyledFormLabel>Email Address</StyledFormLabel>
            </Column>
            <Column style={{ textAlign: 'left'}}>
      			   <StyledInput
                      required
                      onChange={(e) => setData({ ...data, email: e.target.value, snipcart_update_needed: true })}
                      value={data.email}
                      type="email"
                      name="email" />
      			</Column>
    			</Row>
          <br/>
          <StyledButton
            onClick={() => {
              setData({ ...data, username: data.email })
              edit_details(data, user)
              .then((res) => {
                console.log(res);
                appContext.setUser(res.data.user);
                setConfirmed(true);
                setError({});
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data);
                setConfirmed(false);
              });
            }}>
            Submit updated details!
          </StyledButton>
          <p style={{ color: 'green', display: confirmed ? '' : 'none' }}>Your information has been updated!</p>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const parsedItems = {};
  let return_user = null;

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
      } else {
        const user = await res.json();
        return_user = user;
      }
    });
  }
  return { props: { user: return_user } }
}
