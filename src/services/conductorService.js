import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const CONDUCTOR_ENDPOINT = `${API_BASE_URL}/conductor`;

// Configurar axios con timeout
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const conductorService = {
  // Obtener todos los conductores
  async getConductores() {
    try {
      const response = await axiosInstance.get(CONDUCTOR_ENDPOINT);
      console.log('Respuesta completa de la API conductores:', response.data);
      
      if (response.data.success) {
        // Laravel devuelve paginación: response.data.data.data
        const conductores = response.data.data.data || [];
        console.log('Conductores procesados:', conductores);
        return { success: true, data: conductores };
      } else {
        return { success: false, error: 'Error al obtener conductores' };
      }
    } catch (error) {
      console.error('Error en getConductores:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error de conexión' 
      };
    }
  },

  // Crear un nuevo conductor
  async createConductor(conductorData) {
    try {
      const response = await axiosInstance.post(CONDUCTOR_ENDPOINT, conductorData);
      
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: response.data.message || 'Error al crear conductor' };
      }
    } catch (error) {
      console.error('Error en createConductor:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error de conexión' 
      };
    }
  },

  // Actualizar un conductor
  async updateConductor(id, conductorData) {
    try {
      const response = await axiosInstance.put(`${CONDUCTOR_ENDPOINT}/${id}`, conductorData);
      
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: response.data.message || 'Error al actualizar conductor' };
      }
    } catch (error) {
      console.error('Error en updateConductor:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error de conexión' 
      };
    }
  },

  // Eliminar un conductor
  async deleteConductor(id) {
    try {
      const response = await axiosInstance.delete(`${CONDUCTOR_ENDPOINT}/${id}`);
      
      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false, error: response.data.message || 'Error al eliminar conductor' };
      }
    } catch (error) {
      console.error('Error en deleteConductor:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error de conexión' 
      };
    }
  },
};
