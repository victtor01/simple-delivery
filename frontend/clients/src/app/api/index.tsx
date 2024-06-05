import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

export { api };
