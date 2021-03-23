import { createClient } from "../utils/apiClient";

const USER_LOGIN_KEY = "user_login_key";

class UserService {
  constructor() {
    const client = createClient({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
    client.interceptors.response.use((resp) => resp.data, null);
    this.client = client;
  }
  async login(username, password) {
    const res = await this.client.post("/login", { username, password });
    localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(res));
    return res;
  }
  getToken() {
    const str = localStorage.getItem(USER_LOGIN_KEY);
    if (!str) return null;
    try {
      return JSON.parse(str).token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  getUser() {
    const str = localStorage.getItem(USER_LOGIN_KEY);
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  logout() {
    localStorage.removeItem(USER_LOGIN_KEY);
  }
}

export default new UserService();
