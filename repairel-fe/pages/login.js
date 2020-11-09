import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import { StyledTitle, Row, Column } from '../styles/global';
import React, { useState } from "react";
import { login, checkStatus } from "../lib/auth"
import Router from "next/router";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  // checks to see if user is already logged in
  checkStatus();

  return (
    <div>
      <Head>
        <title id='title'>REPAIREL | Login</title>
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
            <Column style={{ textAlign: 'right' }}>Email Address *</Column>
            <Column style={{ textAlign: 'left' }}>
              <input
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                type="email"
                name="email"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}>Password *</Column>
            <Column style={{ textAlign: 'left' }}>
              <input
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                type="password"
                name="password"
              />
            </Column>
          </Row>
          <button
            onClick={() => {
              login(data.email, data.password)
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
            }}>
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
