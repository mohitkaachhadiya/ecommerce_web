import { apiClient } from "./apiClient";

export const productService = {
  getById(id) {
    return apiClient.get(`/product/${id}`);
  },
  getPage(payload) {
    return apiClient.post("/home/page", payload);
  },
  search(Searchvalue) {
    return apiClient.post("/search", { Searchvalue });
  },
  filter(payload) {
    return apiClient.post("/home/filter", payload);
  },
  create(payload) {
    return apiClient.post("/add", payload);
  },
  update(id, payload) {
    return apiClient.post(`/update/${id}`, payload);
  },
  remove(id) {
    return apiClient.post(`/delete/${id}`);
  },
  uploadImage(formData) {
    return apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  submitReview(productId, userId, payload) {
    return apiClient.post(`/reveiw/${productId}/${userId}`, payload);
  },
};
