import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel } from '../styles/global';
import React, { useState, useEffect, useContext } from "react";
import { register } from "../lib/auth"
import { useRouter } from "next/router";

export default function Register() {
  const [data, setData] = useState({ email: "", password: "", forename: "", surname: "" });
  const [error, setError] = useState({});
  const router = useRouter();
  const appContext = useContext(AppContext);

  if (appContext.isAuthenticated) {
    router.push("/"); // redirect if you're already logged in
  }

  return (
    <div>
      <Head>
        <title id='title'>REPAIREL | Register</title>
      </Head>
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '0 5em 0 5em'}}>
          <StyledTitle>Registration</StyledTitle>
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
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>First Name *</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, forename: e.target.value })}
                value={data.forename}
                type="text"
                name="forename"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Second Name *</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, surname: e.target.value })}
                value={data.surname}
                type="text"
                name="surname"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Email Address *</StyledFormLabel></Column>
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
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Password *</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                type="password"
                name="password"
              />
            </Column>
          </Row>
          <StyledButton
            onClick={() => {
              register(data.forename, data.surname, data.email, data.password)
              .then((res) => {
                console.log(res);
                appContext.setUser(res.data.user);
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data);
              });
            }}>
            Click here to register!
          </StyledButton>
        </div>
      </main>
    </div>
  );
}
