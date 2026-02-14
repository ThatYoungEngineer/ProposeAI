import { create } from "apisauce";
import { BASE_URL } from "../config/config";

const apiClient = create({
  baseURL: BASE_URL,
});

export default apiClient;
