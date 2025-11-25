import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { adminlteColors } from '../theme/adminlte';
import AdminLayout from '../components/AdminLayout';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { conductorService } from '../services/conductorService';
import * as licenciaService from '../services/licenciaService';

export default function ConductoresScreen() {
  const [conductores, setConductores] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [modalLicenciaVisible, setModalLicenciaVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    ci: '',
    celular: '',
    id_licencia: '',
  });

  // Cargar conductores al montar el componente
  useEffect(() => {
    cargarConductores();
    cargarLicencias();
  }, []);

  const cargarLicencias = async () => {
    try {
      const data = await licenciaService.getLicencias();
      setLicencias(data);
    } catch (error) {
      console.error('Error al cargar licencias:', error);
    }
  };

  const cargarConductores = async () => {
    setLoading(true);
    try {
      const result = await conductorService.getConductores();
      if (result.success) {
        setConductores(result.data || []);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los conductores');
        setConductores([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión con el servidor');
      setConductores([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCrearConductor = async () => {
    if (
      !formData.nombre.trim() ||
      !formData.apellido.trim() ||
      !formData.fecha_nacimiento.trim() ||
      !formData.ci.trim() ||
      !formData.celular.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const result = await conductorService.createConductor({
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        fecha_nacimiento: formData.fecha_nacimiento,
        ci: formData.ci.trim(),
        celular: formData.celular.trim(),
        id_licencia: formData.id_licencia || null,
      });
      
      if (result.success) {
        Alert.alert('Éxito', 'Conductor creado exitosamente');
        setFormData({
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          ci: '',
          celular: '',
          id_licencia: '',
        });
        setModalCrearVisible(false);
        cargarConductores();
      } else {
        Alert.alert('Error', result.error || 'No se pudo crear el conductor');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const obtenerColorBorde = index => {
    const colores = [
      adminlteColors.primary,
      adminlteColors.success,
      adminlteColors.info,
      adminlteColors.warning,
      adminlteColors.danger,
      adminlteColors.secondary,
    ];
    return colores[index % colores.length];
  };

  return (
    <AdminLayout>
      <Text style={styles.pageTitle}>Gestión de Conductores</Text>

      {/* Botón Crear Conductor */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>
            Conductores Registrados
          </Text>
          <TouchableOpacity
            style={styles.btnCrear}
            onPress={() => setModalCrearVisible(true)}
          >
            <FontAwesome5
              name="plus"
              size={14}
              color="#ffffff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.btnCrearText}>Crear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Conductores */}
      <ScrollView style={styles.conductoresContainer}>
        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={adminlteColors.primary} />
            <Text style={{ marginTop: 10, color: adminlteColors.muted }}>
              Cargando conductores...
            </Text>
          </View>
        ) : conductores.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: adminlteColors.muted }}>
              No hay conductores registrados
            </Text>
          </View>
        ) : (
          <View style={styles.conductoresGrid}>
            {conductores.map((conductor, index) => (
              <View
                key={conductor.id ? `conductor-${conductor.id}` : `conductor-index-${index}`}
                style={[
                  styles.conductorCard,
                  {
                    borderTopWidth: 3,
                    borderTopColor: obtenerColorBorde(index),
                },
              ]}
            >
              <View style={styles.conductorCardHeader}>
                <View style={styles.conductorCardHeaderContent}>
                  <FontAwesome5
                    name="user-tie"
                    size={14}
                    color={adminlteColors.dark}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorCardTitle}>
                    {conductor.nombre} {conductor.apellido}
                  </Text>
                </View>
              </View>

              <View style={styles.conductorCardBody}>
                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="user"
                    size={12}
                    color={adminlteColors.primary}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>Nombre:</Text>
                </View>
                <Text style={styles.conductorInfoValue}>
                  {conductor.nombre}
                </Text>

                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="user-tag"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>Apellido:</Text>
                </View>
                <Text style={styles.conductorInfoValueMuted}>
                  {conductor.apellido}
                </Text>

                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="calendar"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>Fecha Nacimiento:</Text>
                </View>
                <Text style={styles.conductorInfoValueMuted}>
                  {conductor.fecha_nacimiento}
                </Text>

                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="id-card"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>CI:</Text>
                </View>
                <Text style={styles.conductorInfoValueMuted}>
                  {conductor.ci}
                </Text>

                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="phone"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>Celular:</Text>
                </View>
                <Text style={styles.conductorInfoValueMuted}>
                  {conductor.celular}
                </Text>

                <View style={styles.conductorInfoRow}>
                  <FontAwesome5
                    name="certificate"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.conductorInfoLabel}>Tipo Licencia:</Text>
                </View>
                <Text style={styles.conductorInfoValueMuted}>
                  {conductor.licencia 
                    ? conductor.licencia.licencia 
                    : conductor.id_licencia 
                      ? licencias.find(l => l.id === conductor.id_licencia || l.id_licencia === conductor.id_licencia)?.licencia || `ID: ${conductor.id_licencia}`
                      : 'Sin licencia'}
                </Text>
              </View>
            </View>
          ))}
          </View>
        )}
      </ScrollView>

      {/* Modal Crear Conductor */}
      <Modal
        visible={modalCrearVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalCrearVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderContent}>
              <FontAwesome5
                name="user-plus"
                size={18}
                color="#ffffff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.modalHeaderTitle}>Crear Nuevo Conductor</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalCrearVisible(false)}
              style={styles.modalCloseButton}
            >
              <MaterialIcons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Nombre <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Carlos"
                value={formData.nombre}
                onChangeText={text => handleChange('nombre', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Apellido <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Rodríguez"
                value={formData.apellido}
                onChangeText={text => handleChange('apellido', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Fecha Nacimiento <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 15/03/1985"
                value={formData.fecha_nacimiento}
                onChangeText={text => handleChange('fecha_nacimiento', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                CI <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 12345678"
                value={formData.ci}
                onChangeText={text => handleChange('ci', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Celular <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 70123456"
                value={formData.celular}
                onChangeText={text => handleChange('celular', text)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Tipo Licencia <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalLicenciaVisible(true)}
              >
                <Text style={styles.selectButtonText}>
                  {formData.id_licencia 
                    ? licencias.find(l => l.id_licencia === formData.id_licencia)?.licencia || 'Seleccionar licencia'
                    : 'Seleccionar licencia'}
                </Text>
                <FontAwesome5 name="chevron-down" size={14} color={adminlteColors.muted} />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.modalFooterButtonSecondary}
              onPress={() => setModalCrearVisible(false)}
            >
              <Text style={styles.modalFooterButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalFooterButtonSuccess,
                (!formData.nombre.trim() ||
                  !formData.apellido.trim() ||
                  !formData.fecha_nacimiento.trim() ||
                  !formData.ci.trim() ||
                  !formData.celular.trim()) &&
                  styles.modalFooterButtonDisabled,
              ]}
              onPress={handleCrearConductor}
              disabled={
                !formData.nombre.trim() ||
                !formData.apellido.trim() ||
                !formData.fecha_nacimiento.trim() ||
                !formData.ci.trim() ||
                !formData.celular.trim()
              }
            >
              <FontAwesome5
                name="check"
                size={14}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.modalFooterButtonText}>Crear Conductor</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Seleccionar Licencia dentro del modal principal */}
          <Modal
            visible={modalLicenciaVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalLicenciaVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalLicenciaVisible(false)}
            >
              <TouchableOpacity 
                style={styles.modalLicenciaContainer}
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalLicenciaHeader}>
                  <Text style={styles.modalLicenciaTitle}>Seleccionar Licencia</Text>
                  <TouchableOpacity onPress={() => setModalLicenciaVisible(false)}>
                    <MaterialIcons name="close" size={24} color={adminlteColors.dark} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.licenciasList}>
                  {licencias.map((item, index) => {
                    const isSelected = formData.id_licencia === item.id_licencia;
                    console.log('Licencia:', item.licencia, 'ID:', item.id_licencia, 'Selected ID:', formData.id_licencia, 'isSelected:', isSelected);
                    return (
                      <TouchableOpacity
                        key={item?.id_licencia ? item.id_licencia.toString() : `licencia-${index}`}
                        style={[
                          styles.licenciaOption,
                          isSelected && styles.licenciaOptionSelected
                        ]}
                        onPress={() => {
                          console.log('Seleccionando licencia:', item.id_licencia);
                          handleChange('id_licencia', item.id_licencia);
                          setTimeout(() => {
                            console.log('Nuevo valor de id_licencia:', formData.id_licencia);
                            setModalLicenciaVisible(false);
                          }, 100);
                        }}
                      >
                        <Text style={[
                          styles.licenciaOptionText,
                          isSelected && styles.licenciaOptionTextSelected
                        ]}>
                          {item.licencia}
                        </Text>
                        {isSelected && (
                          <FontAwesome5 name="check" size={16} color={adminlteColors.primary} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>
      </Modal>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: adminlteColors.dark,
  },
  card: {
    backgroundColor: adminlteColors.cardBg,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: adminlteColors.dark,
  },
  btnCrear: {
    backgroundColor: adminlteColors.primary,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCrearText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  conductoresContainer: {
    flex: 1,
    marginBottom: 16,
  },
  conductoresGrid: {
    flexDirection: 'column',
  },
  conductorCard: {
    backgroundColor: adminlteColors.cardBg,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  conductorCardHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  conductorCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conductorCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: adminlteColors.dark,
  },
  conductorCardBody: {
    padding: 10,
  },
  conductorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  conductorInfoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: adminlteColors.dark,
  },
  conductorInfoValue: {
    fontSize: 12,
    color: adminlteColors.dark,
    marginTop: 2,
    marginBottom: 4,
    marginLeft: 18,
  },
  conductorInfoValueMuted: {
    fontSize: 12,
    color: adminlteColors.muted,
    marginTop: 2,
    marginBottom: 4,
    marginLeft: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: adminlteColors.lightBg,
  },
  modalHeader: {
    backgroundColor: adminlteColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: adminlteColors.dark,
    marginBottom: 6,
  },
  required: {
    color: adminlteColors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#ffffff',
    color: adminlteColors.dark,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 14,
    color: adminlteColors.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalLicenciaContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalLicenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalLicenciaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: adminlteColors.dark,
  },
  licenciasList: {
    maxHeight: 400,
  },
  licenciaOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  licenciaOptionSelected: {
    backgroundColor: adminlteColors.lightBg,
  },
  licenciaOptionText: {
    fontSize: 15,
    color: adminlteColors.dark,
  },
  licenciaOptionTextSelected: {
    fontWeight: '600',
    color: adminlteColors.primary,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  modalFooterButtonSecondary: {
    backgroundColor: adminlteColors.secondary,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  modalFooterButtonSuccess: {
    backgroundColor: adminlteColors.success,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalFooterButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  modalFooterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
