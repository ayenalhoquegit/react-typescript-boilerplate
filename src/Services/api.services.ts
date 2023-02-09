import axios from "axios";
import { BASE_URL } from "../Utiles/constant";

export const getDataApi = async (endpoint: string) => {
  const baseUrl = BASE_URL || "http://localhost:3300";
  const url = `${baseUrl}${endpoint}`;
  //console.log(url, "url");

  const config = {
    method: "GET",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // get the data from the api
  const res = await axios(config);
  const data = res.data;

  return data;
};
