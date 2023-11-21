import React from "react";
import axios from "axios";
import apiKey from "./private";

export default function GetData() {

  let apiDataObject = {};
  async function fetchData() {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function rooms() {
    let data = await fetchData();
    let params = {
      lat: data.data.latitude,
      lng: data.data.longitude,
      page: "1",
      per_page: "10",
      offset: "0",
      ada: "false",
      unisex: "false",
    };
    let headers = {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "public-bathrooms.p.rapidapi.com",
    };
    try {
      const response = await axios.get(
        "https://public-bathrooms.p.rapidapi.com/location",
        { params, headers }
      );
      apiDataObject = response.data;
      console.log(apiDataObject)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return <>
  <button onClick={rooms}>HERE</button>
  </>;
}
