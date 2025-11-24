import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { adminlteColors } from '../theme/adminlte';
import AdminLayout from '../components/AdminLayout';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const conductoresIniciales = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    fechaNacimiento: '15/03/1985',
    ci: '12345678',
    celular: '70123456',
    tipoLicencia: 'Categoría B',
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'López',
    fechaNacimiento: '22/07/1990',
    ci: '87654321',
    celular: '71234567',
    tipoLicencia: 'Categoría A',
  },
  {
    id: 3,
    nombre: 'José',
    apellido: 'Martínez',
    fechaNacimiento: '10/11/1982',
    ci: '11223344',
    celular: '72345678',
    tipoLicencia: 'Categoría C',
  },
];

export default function ConductoresScreen() {
  const [conductores, setConductores] = useState(conductoresIniciales);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    ci: '',
    celular: '',
    tipoLicencia: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCrearConductor = () => {
    if (
      !formData.nombre.trim() ||
      !formData.apellido.trim() ||
      !formData.fechaNacimiento.trim() ||
      !formData.ci.trim() ||
      !formData.celular.trim() ||
      !formData.tipoLicencia.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const nuevoConductor = {
      id: Date.now(),
      ...formData,
    };

    setConductores(prev => [nuevoConductor, ...prev]);
    setFormData({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      ci: '',
      celular: '',
      tipoLicencia: '',
    });
    setModalCrearVisible(false);
    Alert.alert('Éxito', 'Conductor creado exitosamente');
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
            Listado de Conductores Registrados
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
            <Text style={styles.btnCrearText}>Crear Conductor</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Conductores */}
      <ScrollView style={styles.conductoresContainer}>
        <View style={styles.conductoresGrid}>
          {conductores.map((conductor, index) => (
            <View
              key={conductor.id}
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
                  {conductor.fechaNacimiento}
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
                  {conductor.tipoLicencia}
                </Text>
              </View>
            </View>
          ))}
        </View>
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
                value={formData.fechaNacimiento}
                onChangeText={text => handleChange('fechaNacimiento', text)}
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
              <TextInput
                style={styles.input}
                placeholder="Ej. Categoría B"
                value={formData.tipoLicencia}
                onChangeText={text => handleChange('tipoLicencia', text)}
              />
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
                  !formData.fechaNacimiento.trim() ||
                  !formData.ci.trim() ||
                  !formData.celular.trim() ||
                  !formData.tipoLicencia.trim()) &&
                  styles.modalFooterButtonDisabled,
              ]}
              onPress={handleCrearConductor}
              disabled={
                !formData.nombre.trim() ||
                !formData.apellido.trim() ||
                !formData.fechaNacimiento.trim() ||
                !formData.ci.trim() ||
                !formData.celular.trim() ||
                !formData.tipoLicencia.trim()
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
