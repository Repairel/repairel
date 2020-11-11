import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel } from '../styles/global';
import React, { useState, useEffect, useContext } from "react";
import { login } from "../lib/auth"
import { useRouter } from "next/router";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const router = useRouter();
  const appContext = useContext(AppContext);

  if (appContext.isAuthenticated) {
    router.push("/"); // redirect if you're already logged in
  }

  return (
    <div>
      <Head>
        <title id='title'>REPAIREL | Login</title>
      </Head>
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '0 5em 0 5em'}}>
          <StyledTitle>Login</StyledTitle>
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
              login(data.email, data.password)
              .then((res) => {
                console.log(res);
                appContext.setUser(res.data.user);
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data);
              });
            }}>
            Click here to Login!
          </StyledButton>
        </div>
      </main>
    </div>
  );
}
