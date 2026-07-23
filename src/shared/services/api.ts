import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Müvəqqəti token — login/localStorage axını hazır olana qədər
const TEMP_ACCESS_TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjEsImlhdCI6MTc4NDYzNDEzOCwiZXhwIjoxNzg0Njc3MzM4fQ.nrY_D4gaeiN-DVHQkLp3zlu2oug3UEY8e0v5jbXRmEY"
// Hər sorğuda avtomatik token əlavə edir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") ?? TEMP_ACCESS_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
