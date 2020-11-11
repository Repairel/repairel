import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

export const register = (forename, surname, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        username: email,
        email: email,
        password: password,
        first_name: forename,
        second_name: surname
      })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
        Router.reload(window.location.pathname);
      })
      .catch((error) => {
        // sends the error back to the form
        reject(error);
      });
  });
}

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/`, { identifier: email, password: password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
        Router.reload(window.location.pathname);
      })
      .catch((error) => {
        // sends the error back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  const token = Cookie.get("token");

  if (token) {
    Cookie.remove("token");
    Router.push("/");
    Router.reload(window.location.pathname);
  }
}
