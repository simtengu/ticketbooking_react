import axios from "axios"

let publicApi = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://ticketbooking-backend-oza9.onrender.com/api",
    withCredentials: true,

})

let secureApi = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://ticketbooking-backend-oza9.onrender.com/api",
    withCredentials: true,
  
})

export { publicApi, secureApi }
