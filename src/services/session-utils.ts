import { UserResponse } from "./interface";

export const storage = {
  getToken: () => JSON.parse(window.sessionStorage.getItem("token") || "null"),
  setToken: (token: string) =>
    window.sessionStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => window.sessionStorage.removeItem("token"),
  clearTokenInLocalStorage: () => window.localStorage.removeItem("token"),
  setUser: (user: UserResponse) =>
    window.sessionStorage.setItem("loggedInUser", JSON.stringify(user)),
  clearUser: () => window.sessionStorage.removeItem("loggedInUser"),
};
