import apiService from "@/services/apiService";
import { HOST, USER, USER_LOGIN } from "./api-urls";
import axios from "axios";

export const userRegistration = async (payload) => {
  try {
    const username = "Ab1EcomShoppig";
    const password = "AB1$Play!*ECom^ShOppinG@!!";

    const token = btoa(`${username}:${password}`); // encode to Base64

    const res = await apiService.post(USER, payload, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
};


// export const loginUser = async (payload) => {
//   try {
//     const formData = new URLSearchParams();
//     formData.append("grant_type", "password");
//     formData.append("username", payload.identifier);
//     formData.append("password", payload.password);

//      const username = "Ab1EcomShoppig";
//     const password = "********$Play!*ECom^ShOppinG@!!";

//     const token = btoa(`${username}:${password}`);

//     const res = await apiService.post(USER_LOGIN, formData, {
//       headers: {
//          Authorization: `Basic ${token}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error("Login Error:", error);
//     throw error;
//   }
// };

export const loginUser = async (payload) => {

  try {

    const formData = new URLSearchParams();

    formData.append("grant_type", "password");

    formData.append("username", payload.identifier);

    formData.append("password", payload.password);

    formData.append("scope","read write")
 
    const clientId = "Ab1EcomShopping";

    const clientSecret = "AB1$Play!*ECom^ShOppinG@!!";

    const basicAuth = btoa(`${clientId}:${clientSecret}`);
 
    const res = await apiService.post(USER_LOGIN, formData, {

      headers: {

        "Content-Type": "application/x-www-form-urlencoded",

        "Authorization": `Basic ${basicAuth}`

      }

    });
 
    return res.data;

  } catch (error) {

    console.error("Login Error:", error.response?.data || error.message);

    throw error;

  }

};

 