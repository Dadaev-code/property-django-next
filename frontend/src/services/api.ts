import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})



export const propertyApi = {
  getAll: () => api.get("/properties/"),
  getSingle:  (id: number) => api.get(`/properties/${id}/`),
  create: (data: FormData) => api.post("/properties/",
    data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  ),
  update:  (id: number, data: FormData) => api.patch(`/properties/${id}/`,
    data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  ),
  delete: (id: number) => api.delete(`/properties/${id}/`),
};