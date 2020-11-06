import { createClient } from "../utils/apiClient";
import authService from "./auth";

export default class BaseApi {
  constructor() {
    const client = createClient({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      token: `Beare ${authService.getToken()}`,
    });
    client.interceptors.response.use((res) => res.data, null);
    this.client = client;
  }
}
