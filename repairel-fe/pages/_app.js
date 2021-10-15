import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "next/app";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";
import CookiePopup from "@components/cookiePopup";
import './wishlist.css';
import ReactGA from 'react-ga';
import HttpsRedirect from 'react-https-redirect';

const trackingId = "UA-209962114-1"; 
ReactGA.initialize(trackingId);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto !important;
    padding: 0;
    font-family: 'Work Sans', sans-serif;
    max-width: 1250px;
    font-weight: 300;
  }
  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    dark: "black",
    light: "white",
    bad: "hsl(2, 100%, 72%)",
    medium: "hsl(31, 100%, 61%)",
    good: "hsl(93, 88%, 36%)",
  },
};

class MyApp extends App {


  state = {
    user: null
  };

  componentDidMount() {

    const token = Cookie.get("token");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <HttpsRedirect>
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </>
		<CookiePopup />
      </AppContext.Provider>
      </HttpsRedirect>
    );
  }
}

export default MyApp;
