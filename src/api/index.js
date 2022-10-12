import axios from "axios"

let publicApi = axios.create({
    baseURL:"https://simtenguticketbooking.cyclic.app/api",
    withCredentials: true
})

let secureApi = axios.create({
    baseURL: "https://simtenguticketbooking.cyclic.app/api",
    withCredentials: true
})

export {publicApi,secureApi}