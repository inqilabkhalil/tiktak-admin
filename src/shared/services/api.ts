import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Müvəqqəti token — login/localStorage axını hazır olana qədər

const TEMP_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjEsImlhdCI6MTc4NDcyNTQ4OSwiZXhwIjoxNzg0NzY4Njg5fQ.nAObyG7623VHe5iguO4sl-5L3DZVWW4Ou-KD0ROfRfM';
// Hər sorğuda avtomatik token əlavə edir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  console.log('TOKEN:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
