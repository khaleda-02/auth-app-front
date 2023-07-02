import axios from "axios"
const api = axios.create({
  baseURL: "https://express-auth-app-back.onrender.com",
  // baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  }
})


export default api;


