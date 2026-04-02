const API_BASE_URL = 'https://pros-backend-maa7-3pv39geu6-ali-raza1049s-projects.vercel.app/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  login: async (email, password) => {
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('adminData', JSON.stringify(response.admin));
    }
    
    return response;
  },

  register: async (email, password) => {
    return await makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  verifyToken: async () => {
    return await makeRequest('/auth/verify');
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminData');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },

  getAdminData: () => {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  }
};

// Admin API functions
export const adminAPI = {
  getDashboard: async () => {
    return await makeRequest('/admin/dashboard');
  },

  getServices: async () => {
    return await makeRequest('/admin/services');
  },

  getBookings: async () => {
    return await makeRequest('/admin/bookings');
  }
};

export default { authAPI, adminAPI };