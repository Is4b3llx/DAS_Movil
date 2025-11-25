import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Obtener lista paginada de solicitudes
export const getSolicitudes = async () => {
  try {
    const response = await axiosInstance.get('/solicitud');
    console.log('Solicitudes API full response:', response.data);
    const solicitudes = response.data?.data?.data || [];
    return solicitudes;
  } catch (error) {
    console.error('Error al obtener solicitudes:', error.response?.data || error.message);
    throw error;
  }
};

// Aprobar solicitud
export const approveSolicitud = async (id) => {
  try {
    const response = await axiosInstance.post(`/solicitud/${id}/aprobar`);
    console.log('Solicitud aprobada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al aprobar solicitud:', error.response?.data || error.message);
    throw error;
  }
};

// Negar solicitud
export const denySolicitud = async (id) => {
  try {
    const response = await axiosInstance.post(`/solicitud/${id}/negar`);
    console.log('Solicitud negada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al negar solicitud:', error.response?.data || error.message);
    throw error;
  }
};
