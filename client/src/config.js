import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://fsociety.herokuapp.com/api/"
})