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
  const [data, setData] = useState({ forename: (user) ? user.first_name : "", surname: (user) ? user.second_name : "",  phone: (user) ? user.phone_number : "", email: (user) ? user.email : "", old_password: "", new_password: "" });
  const [error, setError] = useState({});
  const router = useRouter();

  // checks if the site is being redendered client side
  // if it is check if the user is logged in, if not then redirect to login page
  if (process.browser && !appContext.isAuthenticated) {
    router.push("/login");
  }

  // could return a 404 to avoid errors when the form is
  // rendered server side

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
                onChange={(e) => setData({ ...data, forename: e.target.value })}
                value={data.forename}
                type="text"
                name="forename"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Second Name</StyledFormLabel></Column>
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
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Phone Number</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                value={data.phone}
                type="text"
                name="phone"
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
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>Old Password *</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, old_password: e.target.value })}
                value={data.old_password}
                type="password"
                name="old_password"
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ textAlign: 'right' }}><StyledFormLabel>New Password</StyledFormLabel></Column>
            <Column style={{ textAlign: 'left' }}>
              <StyledInput
                required
                onChange={(e) => setData({ ...data, new_password: e.target.value })}
                value={data.new_password}
                type="password"
                name="new_password"
              />
            </Column>
          </Row>
          <p>* required fields</p>
          <StyledButton
            onClick={() => {
              edit_details(data)
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
