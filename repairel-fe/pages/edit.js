import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel } from '../styles/global';
import React, { useState, useEffect, useContext } from "react";
import { edit_details } from "../lib/auth";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Edit() {
  const appContext = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);
  const [data, setData] = useState({ first_name: (user) ? user.first_name : "", second_name: (user) ? user.second_name : "",
    phone_number: (user) ? user.phone_number : "", email: (user) ? user.email : "" });
  const [error, setError] = useState({});
  const router = useRouter();

  // once the user has finished with the form we send them
  // back to the index page
  if (process.browser && !appContext.isAuthenticated) {
    console.log("hey");
    router.push("/", "/?redirect=edit");
  }

  return (
    <div>
      <Head>
        <title id='title'>REPAIREL | Edit Details</title>
      </Head>
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '0 5em 0 5em'}}>
          <StyledTitle>Edit Details</StyledTitle>
          <hr />

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
            })}
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>First Name</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, first_name: e.target.value })}
                value={data.first_name}
                type="text"
                name="first_name"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Second Name</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, second_name: e.target.value })}
                value={data.second_name}
                type="text"
                name="second_name"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Phone Number</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                value={data.phone_number}
                type="text"
                name="phone_number"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Email Address</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                type="email"
                name="email"
              />
            </Column>
          </Row>
          <StyledButton
            onClick={() => {
              edit_details(data, user)
              .then((res) => {
                console.log(res);
                appContext.setUser(res.data.user);
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data);
              });
            }}>
            Submit updated details!
          </StyledButton>
        </div>
      </main>
    </div>
  );
}
