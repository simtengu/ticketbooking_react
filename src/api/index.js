import axios from "axios"

let publicApi = axios.create({
    // baseURL:"https://simtenguticketbooking.cyclic.app/api",
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

let secureApi = axios.create({
    // baseURL: "https://simtenguticketbooking.cyclic.app/api",
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export {publicApi,secureApi}