import axios from "axios";
import React from "react";
import { useEffect } from "react";


// export const getAuthorization = () => `Bearer ${localStorage.getItem("accessToken")}`;
let accessToken;

export default function MyComponent() {
  useEffect(() => {
    // Check if window is defined (running on client-side, not server-side)
    if (typeof window !== "undefined") {
      accessToken = localStorage.getItem("accessToken");
    }
  }, []);
}

export const getHeader = (token) => {
  const headers = {
    "Content-Type":  "application/json; charset=utf-8",
    // 'Authorization': `Bearer ${token ? token : accessToken}`
  };
  return { headers };
};

// Get
export async function get(url,token) {
  let response = await axios
    .get(url, getHeader(token))
    .then((res) => {return res})
    .catch((err) => {
      return [];
    });
  if (response && response.data && response.status === 200) {
    return response.data;
  } else {
    response = [];
  }

  return response;
}

export async function Get(url,token) {
  let response = await axios
    .get(url, getHeader(token))
    .then((res) => res)
    .catch((err) => {
      return [];
    });
    if (response && response.data && response.status === 200) {
    return response;
  } else {
    response = [];
  }

  return response;
}

// Post
export async function POST(url, data) {
  const response = await axios.post(url, data).catch((err) => {});
  if (response && response.data && response.status === 200) {
    return response;
  }
  return response;
}
export async function post(url, data) {
  const response = await axios.post(url, data).catch((err) => {});

  if (response && response.data && response.status === 200) {
    return response.data;
  }
  // if (response.status === 201) {
  //   return true;
  // }

  return response;
}
// Post
export async function Post(url, data, headers) {
  const response = await axios.post(url, data, headers).catch((err) => {});
  if (response) {
    return response.data;
  }
  return response;
}

// Post
export async function Put(url, data, token) {
  const response = await axios.put (url, data, getHeader(token)).catch((err) => {});
  // if (response) {
  //   return response.data;
  // }
  return response;
}





export async function Delete(url) {
  const response = await axios.delete(url);
  // if (response) {
  //   return response;
  // }
  // if (response.status === 201) {
  //   return true;
  // }

  return response;
}