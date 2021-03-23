import UserService from "./user";

export function createServices() {
  return {
    user: new UserService(),
  };
}
