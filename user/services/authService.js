import { apiClient } from "./apiClient";

export const authService = {
  register(payload) {
    return apiClient.post("/register", payload);
  },
  login(payload) {
    return apiClient.post("/login", payload);
  },
  logout() {
    return apiClient.post("/logout");
  },
};
