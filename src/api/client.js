import axios from "axios"
const api = axios.create({
  baseURL: 'https://express-auth-app-back.onrender.com',
  headers: {
    "Content-Type": "application/json",
  }
})


export default api;


