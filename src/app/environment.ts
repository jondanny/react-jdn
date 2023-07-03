const API_BASE_URL = "http://localhost:3000";

export const environment = {
  NODE_ENV: process.env["NODE_ENV"] || "development",

  API_BASE_URL: process.env["REACT_APP_API_BASE_URL"] || API_BASE_URL,
};
