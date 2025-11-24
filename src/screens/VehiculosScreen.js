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

const vehiculosIniciales = [
  {
    id: 1,
    placa: 'ABC-1234',
    capacidadMaxKg: '1500',
    tipo: 'Camioneta',
    modeloAnio: '2020',
    modelo: 'Hilux',
    marca: 'Toyota',
  },
  {
    id: 2,
    placa: 'XYZ-5678',
    capacidadMaxKg: '2000',
    tipo: 'Camión',
    modeloAnio: '2019',
    modelo: 'Ranger',
    marca: 'Ford',
  },
  {
    id: 3,
    placa: 'LMN-9012',
    capacidadMaxKg: '1200',
    tipo: 'Van',
    modeloAnio: '2021',
    modelo: 'H100',
    marca: 'Hyundai',
  },
];

export default function VehiculosScreen() {
  const [vehiculos, setVehiculos] = useState(vehiculosIniciales);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [formData, setFormData] = useState({
    placa: '',
    capacidadMaxKg: '',
    tipo: '',
    modeloAnio: '',
    modelo: '',
    marca: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCrearVehiculo = () => {
    if (
      !formData.placa.trim() ||
      !formData.capacidadMaxKg.trim() ||
      !formData.tipo.trim() ||
      !formData.modeloAnio.trim() ||
      !formData.modelo.trim() ||
      !formData.marca.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const nuevoVehiculo = {
      id: Date.now(),
      ...formData,
    };

    setVehiculos(prev => [nuevoVehiculo, ...prev]);
    setFormData({
      placa: '',
      capacidadMaxKg: '',
      tipo: '',
      modeloAnio: '',
      modelo: '',
      marca: '',
    });
    setModalCrearVisible(false);
    Alert.alert('Éxito', 'Vehículo creado exitosamente');
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
      <Text style={styles.pageTitle}>Gestión de Vehículos</Text>

      {/* Botón Crear Vehículo */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>
            Listado de Vehículos Registrados
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
            <Text style={styles.btnCrearText}>Crear Vehículo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Vehículos */}
      <ScrollView style={styles.vehiculosContainer}>
        <View style={styles.vehiculosGrid}>
          {vehiculos.map((vehiculo, index) => (
            <View
              key={vehiculo.id}
              style={[
                styles.vehiculoCard,
                {
                  borderTopWidth: 3,
                  borderTopColor: obtenerColorBorde(index),
                },
              ]}
            >
              <View style={styles.vehiculoCardHeader}>
                <View style={styles.vehiculoCardHeaderContent}>
                  <FontAwesome5
                    name="car"
                    size={14}
                    color={adminlteColors.dark}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoCardTitle}>
                    {vehiculo.placa}
                  </Text>
                </View>
              </View>

              <View style={styles.vehiculoCardBody}>
                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="clipboard"
                    size={12}
                    color={adminlteColors.primary}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Placa:</Text>
                </View>
                <Text style={styles.vehiculoInfoValue}>
                  {vehiculo.placa}
                </Text>

                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="weight"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Capacidad Máx (kg):</Text>
                </View>
                <Text style={styles.vehiculoInfoValueMuted}>
                  {vehiculo.capacidadMaxKg}
                </Text>

                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="truck"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Tipo:</Text>
                </View>
                <Text style={styles.vehiculoInfoValueMuted}>
                  {vehiculo.tipo}
                </Text>

                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="calendar"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Modelo Año:</Text>
                </View>
                <Text style={styles.vehiculoInfoValueMuted}>
                  {vehiculo.modeloAnio}
                </Text>

                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="car-side"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Modelo:</Text>
                </View>
                <Text style={styles.vehiculoInfoValueMuted}>
                  {vehiculo.modelo}
                </Text>

                <View style={styles.vehiculoInfoRow}>
                  <FontAwesome5
                    name="tag"
                    size={12}
                    color={adminlteColors.muted}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.vehiculoInfoLabel}>Marca:</Text>
                </View>
                <Text style={styles.vehiculoInfoValueMuted}>
                  {vehiculo.marca}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal Crear Vehículo */}
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
                name="plus-circle"
                size={18}
                color="#ffffff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.modalHeaderTitle}>Crear Nuevo Vehículo</Text>
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
                Placa <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. ABC-1234"
                value={formData.placa}
                onChangeText={text => handleChange('placa', text)}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Capacidad Máxima (kg) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 1500"
                value={formData.capacidadMaxKg}
                onChangeText={text => handleChange('capacidadMaxKg', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Tipo <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Camioneta"
                value={formData.tipo}
                onChangeText={text => handleChange('tipo', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Modelo Año <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 2020"
                value={formData.modeloAnio}
                onChangeText={text => handleChange('modeloAnio', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Modelo <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Hilux"
                value={formData.modelo}
                onChangeText={text => handleChange('modelo', text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Marca <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Toyota"
                value={formData.marca}
                onChangeText={text => handleChange('marca', text)}
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
                (!formData.placa.trim() ||
                  !formData.capacidadMaxKg.trim() ||
                  !formData.tipo.trim() ||
                  !formData.modeloAnio.trim() ||
                  !formData.modelo.trim() ||
                  !formData.marca.trim()) &&
                  styles.modalFooterButtonDisabled,
              ]}
              onPress={handleCrearVehiculo}
              disabled={
                !formData.placa.trim() ||
                !formData.capacidadMaxKg.trim() ||
                !formData.tipo.trim() ||
                !formData.modeloAnio.trim() ||
                !formData.modelo.trim() ||
                !formData.marca.trim()
              }
            >
              <FontAwesome5
                name="check"
                size={14}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.modalFooterButtonText}>Crear Vehículo</Text>
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
  vehiculosContainer: {
    flex: 1,
    marginBottom: 16,
  },
  vehiculosGrid: {
    flexDirection: 'column',
  },
  vehiculoCard: {
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
  vehiculoCardHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  vehiculoCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehiculoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: adminlteColors.dark,
  },
  vehiculoCardBody: {
    padding: 10,
  },
  vehiculoInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  vehiculoInfoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: adminlteColors.dark,
  },
  vehiculoInfoValue: {
    fontSize: 12,
    color: adminlteColors.dark,
    marginTop: 2,
    marginBottom: 4,
    marginLeft: 18,
  },
  vehiculoInfoValueMuted: {
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
