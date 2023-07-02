import api from '../client'
import Cookies from 'js-cookie';
const loginAPI = async (email, password) => {
  return await api.post('/api/auth/login', { email, password });
}
const loginUserWithGoogleAPI = async (accessToken) => {
  return await api.post('/api/auth/login', { googleToken: accessToken });
}
const registerAPI = async (username, email, password) => {
  return await api.post('/api/auth/register', { username, email, password });
}
const registerUserWithGoogleAPI = async (accessToken) => {
  return await api.post('/api/auth/register', { googleToken: accessToken });
}
const logoutAPI = async () => {
  return await api.get('/api/auth/logout');
}
const isAuthAPI = async () => {
  return await api.get('/api/auth/isauth', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
    }
  });
}

//! VerifyUser Feature 
const sendVerifyUserOTPAPI = async () => {
  return await api.get('/api/auth/verify/', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
    }
  });
}

const verifyUserAPI = async (OTP) => {
  return await api.post('/api/auth/verify/', { OTP }, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
    }
  });
}

//! ForgotPassword Feature 
const sendResetPasswordOTPAPI = async (email) => {
  return await api.post('/api/auth/forgot-password/', { email });
}
const resetPasswordAPI = async (email, OTP, newPassword) => {
  return await api.post('/api/auth/forgot-password/reset', { email, OTP, newPassword });
}

export {
  loginAPI, registerAPI, loginUserWithGoogleAPI, registerUserWithGoogleAPI,
  logoutAPI, isAuthAPI, sendResetPasswordOTPAPI, resetPasswordAPI,
  sendVerifyUserOTPAPI, verifyUserAPI
}