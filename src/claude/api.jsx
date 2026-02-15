import axios from 'axios';

const API_URL = 'http://localhost/php-backend/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - token yenileme
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token süresi dolmuşsa ve retry daha önce yapılmamışsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh.php`, {
            refresh_token: refreshToken,
          });

          const { access_token } = response.data.data;
          localStorage.setItem('access_token', access_token);

          // Orijinal isteği yeni token ile tekrarla
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token da geçersizse, logout yap
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth servisleri
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login.php', { email, password });
    if (response.data.success) {
      const { access_token, refresh_token, user } = response.data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout.php');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },
};

// Kullanıcı servisleri
export const userService = {
  getAll: async () => {
    const response = await api.get('/users/list.php');
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/users/create.php', userData);
    return response.data;
  },

  update: async (userData) => {
    const response = await api.put('/users/update.php', userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete('/users/delete.php', { data: { id } });
    return response.data;
  },
};

export default api;