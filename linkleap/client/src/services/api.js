import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor to add the auth token to every request if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Service
export const register = (userData) => api.post('/api/auth/register', userData);
export const login = (userData) => api.post('/api/auth/login', userData);

// URL Service
export const createShortUrl = (urlData) => api.post('/api/urls', urlData);
export const getUrlsForUser = () => api.get('/api/urls');
export const deleteUrl = (id) => api.delete(`/api/urls/${id}`);

export default api;
