import axios from "axios";
const baseUrl = "/api/blogs";

// This private variable holds the formatted token string locally in this module
let token = null;

// App.jsx calls this function to pass the token whenever a user logs in or resumes a session
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  // We attach the Authorization header configuration here
  const config = {
    headers: { Authorization: token },
  };

  // The config object containing our token is passed as the third argument
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// Export all the service functions as an object
export default { getAll, create, setToken };
