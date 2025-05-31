import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 10000, // optional
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log("REACT_APP_API_BASE_URL ",process.env.REACT_APP_API_BASE_URL)
// Optional: Add interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token, etc.
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, 500, etc.
    if (error.response?.status === 401) {
      // Redirect or logout
      console.warn('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
