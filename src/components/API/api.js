
import axios from "axios";

const api = axios.create({
  baseURL: "https://empbackend-production.up.railway.app/api/v1", // Replace with your API base URL
});

export default api;
