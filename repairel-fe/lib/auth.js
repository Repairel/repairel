import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";


export const register = (forename, surname, email, password, phone) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        username: email,
        email: email,
        password: password,
        first_name: forename,
        second_name: surname,
        phone_number: phone
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
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/`, { identifier: email, password: password })
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

export const logout = () => {
  const token = Cookie.get("token");

  if (token) {
    Cookie.remove("token");
    Router.push("/");
  }
}


export const edit_details = (items, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, items, { headers: { Authorization: `Bearer ${Cookie.get("token")}` } })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  });
}
