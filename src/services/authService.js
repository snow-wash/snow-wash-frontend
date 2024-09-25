// src/services/authService.js
export const getToken = () => localStorage.getItem('token');

export const setToken = token => localStorage.setItem('token', token);

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setRefreshToken = refreshToken =>
  localStorage.setItem('refreshToken', refreshToken);

export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
};
