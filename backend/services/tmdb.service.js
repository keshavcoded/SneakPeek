import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromAPI = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status != 200) {
    throw new Error(
      "Error in fetching data from TMDB API" + response.statusText
    );
  }

  return response.data;
};
