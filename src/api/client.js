import { create } from "apisauce";

const apiClient = create({
    baseURL: process.env.BASE_URL
})

export default apiClient;