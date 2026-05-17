import { apiClient } from "./apiClient";

export const cartService = {
  addItem(userId, payload) {
    return apiClient.post(`/home/addtocart/${userId}`, payload);
  },
  getItems(userId) {
    return apiClient.get(`/home/getcart/${userId}`);
  },
  removeItem(userId, cartItemId) {
    return apiClient.post(`/home/deletecartitem/${userId}`, { cartItemId });
  },
  increaseQuantity(userId, cartItemId) {
    return apiClient.post(`/incQty/${userId}`, { cartItemId });
  },
  decreaseQuantity(userId, cartItemId) {
    return apiClient.post(`/decQty/${userId}`, { cartItemId });
  },
};
