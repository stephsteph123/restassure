import { useState } from "react";
import axios from "axios";
import apiKey from "../private"

export const useRestroomLocator = () => {
  const [apiDataObject, setApiDataObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  const findRestrooms = async () => {
    setIsLoading(true);
    let data = await fetchData();
    if (!data) {
      setIsLoading(false);
      return;
    }

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
      for (let i = 0; i < response.data.length; i++) {
      const element = response.data[i];
      if (element.accessible){
        setApiDataObject(prevApiData => [...prevApiData, elements]);
      }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { apiDataObject, findRestrooms, isLoading, error };
};
