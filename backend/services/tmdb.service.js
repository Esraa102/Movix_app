import axios from "axios";
import { ENV_VARS } from "../config/env_Vars.js";

const fetchFromTMDB = async (url, filters) => {
  const options = {
    method: "GET",
    params: filters ? { language: "en-US", ...filters } : { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMD_API_KEY,
    },
  };

  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(
      "Failed to fetch from DB, Error in fetchFromTMBD()" + response.statusText
    );
  }
  return response.data;
};

export default fetchFromTMDB;
