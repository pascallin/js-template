import BaseApi from "./baseApi";

export default class UserService extends BaseApi {
  async list() {
    return await this.client.get("/user");
  }
  async register(params) {
    return await this.client.post("/user/register", params);
  }
  async password(params) {
    return await this.client.patch("/user/password", params);
  }
}
