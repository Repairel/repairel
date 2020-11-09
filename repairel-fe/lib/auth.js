import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const checkStatus = () => {
  const token = Cookie.get("token");
  if (token) {
    fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(async (res) => {
      if (!res.ok) {
        Cookie.remove("token");
      } else {
        Router.push("/");
      }
    })
  }
}

export const register = (forename, surname, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, {
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
      .post(`${API_URL}/auth/local/`, { identifier: email, password: password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((error) => {
        // sends the error back to the form
        reject(error);
      });
  });
};
