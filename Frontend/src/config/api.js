// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://food-insta-3.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  USER_LOGIN: `${API_BASE_URL}/api/auth/login`,
  USER_REGISTER: `${API_BASE_URL}/api/auth/register`,
  USER_LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  USER_PROFILE: `${API_BASE_URL}/api/auth/profile`,
  
  // Food Partner Auth endpoints
  FOODPARTNER_LOGIN: `${API_BASE_URL}/api/auth/login/foodpatner`,
  FOODPARTNER_REGISTER: `${API_BASE_URL}/api/auth/register/foodpatner`,
  FOODPARTNER_PROFILE: `${API_BASE_URL}/api/auth/profile/foodpatner`,
  
  // Food endpoints
  FOOD_CREATE: `${API_BASE_URL}/api/food`,
  FOOD_GET_ALL: `${API_BASE_URL}/api/food`,
  FOOD_GET_BY_PARTNER: `${API_BASE_URL}/api/food/getfood`,
};

export default API_BASE_URL;
