import axiosRequest from "axios"

export const axios = axiosRequest.create({
    baseURL:'http://localhost:3333'
})
