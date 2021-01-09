import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle,StyledLink, Row, Column, StyledButton, StyledInput, StyledFormLabel } from '../styles/global';
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
			
			<Row style={{ textAlign: 'center', paddingTop:'5em' }}>
			
			<Column style={{ marginLeft: -90 }}><StyledFormLabel  >Email Address <b>*</b></StyledFormLabel></Column>
			
			</Row>
			<Row>
			<StyledInput
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                type="email"
                name="email"
              />
			</Row>
			<Row>
			<StyledFormLabel style={{ marginLeft: -135 }}>Password <b>*</b></StyledFormLabel>
			</Row>
			<Row >
			<StyledInput
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                type="password"
                name="password"
				
              />
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
            LOGIN
          </StyledButton>
		  <div>
		   Don't have an account?  <StyledLink><a  href='/register'>Register </a></StyledLink>
		  </div>
        </div>
      </main>
    </div>
  );
}
