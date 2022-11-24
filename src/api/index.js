import axios from "axios"

let publicApi = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://simtenguticketbooking.cyclic.app/api",
    withCredentials: true
})

let secureApi = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://simtenguticketbooking.cyclic.app/api",
    withCredentials: true
})

export { publicApi, secureApi }