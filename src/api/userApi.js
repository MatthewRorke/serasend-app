import axios from "axios";

const BASE_URL = "http://localhost:8000";

/**
 * Makes API call to login a user
 * @param {string} email
 * @param {string} password
 */
export const loginUser = async (email, password) => {
  const postData = { email, password };
  const apiUrl = `${BASE_URL}/api/user/login`;

  return await axios
    .post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
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
 * Makes API call to register a user
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
export const registerUser = async (username, email, password) => {
  const postData = { username, email, password };
  const apiUrl = `${BASE_URL}/api/user/create`;

  return await axios
    .post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

/**
 * Makes API call to change users password
 * @param {string} token
 * @param {string} newPassword
 * @param {string} currentPassword
 */
export const changeUserPassword = async (token, newPassword, currentPassword) => {
  const postData = { newPassword, currentPassword };
  const apiUrl = `${BASE_URL}/api/user/change-password`;

  return await axios
    .patch(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

/**
 * Makes API call to request password reset instructions
 * @param {string} email
 */
export const requestPasswordReset = async (email) => {
  const postData = { email };
  const apiUrl = `${BASE_URL}/api/user/forgot-password`;

  return await axios
    .post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

/**
 * Makes API call to request password reset instructions
 * @param {string} email
 */
export const resetPassword = async (email, newPassword, token) => {
  const postData = { email, newPassword, token };
  const apiUrl = `${BASE_URL}/api/user/reset-password`;

  return await axios
    .post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

/**
 * Makes API call to get a user
 */
export const getUser = async (token) => {
  const apiUrl = `${BASE_URL}/api/user`;
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
 * Makes API call to verify a users Email
 */
export const verifyUserEmail = async (token, code) => {
  const postData = { code };
  const apiUrl = `${BASE_URL}/api/user/verification`;
  return await axios
    .post(apiUrl, postData, {
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
