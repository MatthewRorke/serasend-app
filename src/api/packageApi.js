import axios from "axios";

const BASE_URL = "http://localhost:8000";

/**
 * Makes API call to get packages
 */
export const getPackages = async (token) => {
  const apiUrl = `${BASE_URL}/api/package`;
  return await axios
    .get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/**
 * Makes API call to get a single packages
 */
export const getSinglePackage = async (token, id) => {
  const apiUrl = `${BASE_URL}/api/package/${id}`;
  return await axios
    .get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
