import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import AppContext from "../context/AppContext";
import { StyledTitle, Row, Column, StyledButton, StyledInput, StyledFormLabel,StyledSection,StyledLink } from '../styles/global';
import React, { useState, useEffect, useContext } from "react";
import { register } from "../lib/auth"
import { useRouter } from "next/router";

export default function Register() {
  const [data, setData] = useState({ email: "", password: "", forename: "", surname: "" , phone: ""});
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
        <div style={{ textAlign: 'left', padding: '0 5em 0 5em'}}>
          <StyledTitle>REGISTRATION</StyledTitle>
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
			<center>


			<Row style={{ textAlign: 'center', paddingTop:'5em' }}>

			<Column style={{ marginLeft: -125 }}><StyledFormLabel  >First Name <b>*</b></StyledFormLabel></Column>

			</Row>
			<Row>
			<StyledInput
                required
                onChange={(e) => setData({ ...data, forename: e.target.value })}
                value={data.forename}
                type="text"
                name="forename"
              />
			</Row>
			<Row>
			<StyledFormLabel style={{ marginLeft: -162 }}>Surname </StyledFormLabel>
			</Row>
			<Row>
			<StyledInput
                onChange={(e) => setData({ ...data, surname: e.target.value })}
                value={data.surname}
                type="text"
                name="surname"
           />
			</Row>
			<Row>
			<StyledFormLabel style={{ marginLeft: -105 }}>Phone Number </StyledFormLabel>
			</Row>
			<Row>
			<StyledInput
                required
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                value={data.phone}
                type="text"
                name="phone"
              />
			</Row>
			<Row>
			<StyledFormLabel style={{ marginLeft: -99 }}>Email Address <b>*</b></StyledFormLabel>
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
			<StyledFormLabel style={{ marginLeft: -139 }}>Password <b>*</b></StyledFormLabel>
			</Row>
		    <Row>
			<StyledInput
				required
				onChange={(e) => setData({ ...data, password: e.target.value })}
				value={data.password}
				type="password"
				name="password"
			  />
		    </Row>


          <p>* required fields</p>

          <StyledButton
            onClick={() => {
              register(data.forename, data.surname, data.email, data.password, data.phone)
              .then((res) => {
                console.log(res);
                appContext.setUser(res.data.user);
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data);
              });
            }}>
              REGISTER
          </StyledButton>
		  <div>
      <br></br>
		   Already have an account?  <StyledLink><a  href='/login' style={{paddingBottom: 100}}>Log In </a></StyledLink>
		  </div>
		  </center>
        </div>
      </main>
    </div>
  );
}
