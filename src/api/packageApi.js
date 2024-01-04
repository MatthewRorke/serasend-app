import axios from "axios";

const BASE_URL = process.env.BACKEND_DOMAIN;

/**
 * Makes API call to get packages
 */
export const getPackages = async (token) => {
  const apiUrl = `${BASE_URL}/api/packages`;
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
  const apiUrl = `${BASE_URL}/api/packages/${id}`;
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
 * Makes API call to get a packages checkout form
 */
export const getPackageCheckoutForm = async (token, id) => {
  const apiUrl = `${BASE_URL}/api/package/${id}/payment-form`;
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
 * Get package assigned to user
 * @param {*} token
 * @returns
 */
export const getAssignedPackage = async (token) => {
  const apiUrl = `${BASE_URL}/api/packages/assigned`;
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
