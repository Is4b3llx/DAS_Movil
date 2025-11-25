// services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const LOGIN_ENDPOINT = '/login';

export const login = async (correo_electronico, password) => {
  try {
    const res = await axiosInstance.post(LOGIN_ENDPOINT, {
      correo_electronico,
      password,
    });

    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Error en inicio de sesión');
    }

    const { token, user } = res.data;
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }
    if (user) {
      await AsyncStorage.setItem('authUser', JSON.stringify(user));
    }

    return { token, user };
  } catch (error) {
    console.log('Error en login:', error.response?.data || error.message);
    const msg =
      error.response?.data?.message ||
      error.message ||
      'No se pudo iniciar sesión';
    throw new Error(msg);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('authUser');
  } catch (e) {
    console.log('Error limpiando sesión:', e);
  }
};

export const getStoredSession = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const userStr = await AsyncStorage.getItem('authUser');
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
};
