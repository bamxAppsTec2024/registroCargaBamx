import React from 'react';
import { useState, useEffect } from "react";
import {
  Button,
  Alert,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from 'react-hook-form';

import DropdownComponent from './Dropdown';
import Radio from './Radio';
import DateTimePicker from '@react-native-community/datetimepicker';
import Camera from './Camera';

import * as ImagePicker from "expo-image-picker";

import { uploadToFirebase, db, getCatalogoDropdown } from '../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";


export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [conductores, setConductores] = useState([]);
  const [donantes, setDonantes] = useState([]);
  const [razonesDesperdicio, setRazonesDesperdicio] = useState([]);
  const [donativos, setDonativos] = useState([]);

  const defaultValuesForm = {
    fecha: new Date(),
    conductor: '',
    donante: '',
    cargaCiega: false,
    tipoCarga: 'Perecedero',
    donativo: '',
    cantidadCarga: '',
    hayDesperdicio: true,
    porcentajeDesperdicio: '',
    razonDesperdicio: '',
    uriFoto: ''
  };

  // Obtener opciones de dropdown al consultar catálogos de base de datps
  const getStateValues = async () => {
    try {
      const arrConductores = await getCatalogoDropdown('conductor');
      setConductores(arrConductores);

      const arrDonantes = await getCatalogoDropdown('donante');
      setDonantes(arrDonantes);

      const arrRazonesDesp = await getCatalogoDropdown('razonDesperdicio');
      setRazonesDesperdicio(arrRazonesDesp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStateValues();
  }, []);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: defaultValuesForm
  });

  // Observar cada vez que el valor de tipo de carga cambie
  // mediante React Hook Form watch
  const watchTipoCarga = watch("tipoCarga", 'Perecedero');

  // Diccionario que relaciona nombre de tipo de carga
  // con nombre de la colección del catálogo correspondiente
  // en la base de datos
  const dicTiposDonativos = {
    'Perecedero': 'perecedero',
    'No Perecedero': 'noPerecedero',
    'No Comestible': 'noComestible',
  };

  const clearForm = () => {
    reset(defaultValuesForm);
    // El imageUri es un state obtenido del componente Camera, por ello
    // no se hace reset con el reset de react hook form.
    setImageUri('');
  };

  // Función que dependiendo del valor del tipo de carga,
  // obtiene el cátalogo de los donativos correspondientes.
  const obtenerCatalogo = async (watchTipoCarga) => {
    try {
      const arrDonativo = await getCatalogoDropdown(dicTiposDonativos[watchTipoCarga]);
      setDonativos(arrDonativo);
    } catch (error) {
      console.log(error);
    }
  };

  // Cuando cambie el valor del tipo de carga, se llama
  // a la función obtenerCatalogo para actualizar el listado de opciones.
  useEffect(() => {
    obtenerCatalogo(watchTipoCarga);
  }, [watchTipoCarga]);


  const dataCargaCiega = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];
  const dataHayDesperdicio = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];
  const dataTipoCarga = [
    { label: 'Perecedero', value: 'Perecedero' },
    { label: 'No Perecedero', value: 'No Perecedero' },
    { label: 'No Comestible', value: 'No Comestible' },
  ];

  // Función para crear opciones de porcentajes
  // para campo porcentajes desperdicio
  const crearArregloPorcentajes = () => {
    const porcentajes = [];
    for (let i = 0; i <= 100; i += 10) {
      // Dar formato para el dropdown
      porcentajes.push({
        label: `${i}%`,
        value: i
      });
    }
    return porcentajes;
  };
  const porcentajes = crearArregloPorcentajes();


  async function saveRecord(formData) {
    try {
      const docRef = await addDoc(collection(db, "donativo"), formData);
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  // Función para structurar datos como se enviarán a la base de datos
  const estructurarData = (data) => {
    data.conductor = data.conductor.value;
    data.donante = data.donante.value;
    data.donativo = data.donativo.value;
    data.porcentajeDesperdicio = data.porcentajeDesperdicio.value;
    data.razonDesperdicio = data.razonDesperdicio.value;
    data.uriFoto = imageUri;

    // Eliminar hora de la data debido a que se incluye en fecha al crear new Date()
    delete data.hora;
  };

  const onSubmit = async (data) => {
    estructurarData(data);
    console.log(data);
    try {
      const uploadResp = await uploadToFirebase(imageUri, fileName, (v) =>
        console.log(v)
      );
      console.log(uploadResp);
      saveRecord(data); // Guardar record en la base de datos
      clearForm(); // Limpiar los campos del formulario
    } catch (e) {
      Alert.alert("Error" + e.message);
    }


  };
  const allowOnlyNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  // Verificar si la aplicación tiene acceso a la cámara del celular
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View>
        <Text style={styles.permissionMessage}>Permiso de la cámara no está habilitado</Text>
        <StatusBar style="auto" />
        <Button title="Solicitar permiso" onPress={requestPermission} style={{ justifyContent: 'center' }}></Button>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          // keyboardVerticalOffset={height + 47}
          behavior="padding"
          // style={{ flex: 1 }}
          enabled
        >
          <View style={styles.container}>
            <View style={styles.dateTime}>
              <View >
                <Text style={styles.label}>Fecha</Text>
                <View style={styles.dateView}>
                  <Controller
                    control={control}
                    name={'fecha'}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={'date'}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora</Text>
                <View style={styles.dateView}>
                  <Controller
                    control={control}
                    name={'hora'}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={'time'}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Conductor</Text>
              <Controller
                control={control}
                name={'conductor'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={conductores}
                    placeholder='Conductor'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Donante</Text>
              <Controller
                control={control}
                name={'donante'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={donantes}
                    placeholder='Donante'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>¿Carga Ciega?</Text>
              <Controller
                control={control}
                name={'cargaCiega'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Radio
                    data={dataCargaCiega}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    horizontalOptions={true}
                  />
                )}
              />
            </View>
            <View>
              <Text style={styles.label}>Tipo de Carga</Text>
              <Controller
                control={control}
                name={'tipoCarga'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Radio
                    data={dataTipoCarga}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    horizontalOptions={false}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Donativo</Text>
              <Controller
                control={control}
                name={'donativo'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={donativos}
                    placeholder='Donativo'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            <View>
              <Text style={styles.label}>Cantidad Carga (toneladas)</Text>
              <Controller
                control={control}
                name={'cantidadCarga'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    placeholder='Cantidad Carga'
                    placeholderTextColor={'black'} 
                    value={value}
                    onChangeText={(text) => onChange((text))}
                    onBlur={onBlur}
                    style={styles.textInput}
                  />
                )}
              />
            </View>


            <View>
              <Text style={styles.label}>¿Hay Desperdicio?</Text>
              <Controller
                control={control}
                name={'hayDesperdicio'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Radio
                    data={dataHayDesperdicio}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    horizontalOptions={true}
                  />
                )}
              />
            </View>
            <View>
              <Text style={styles.label}>Porcentaje Desperdicio</Text>
              <Controller
                control={control}
                name={'porcentajeDesperdicio'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={porcentajes}
                    placeholder='Porcentaje Desperdicio'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Razón Desperdicio</Text>
              <Controller
                control={control}
                name={'razonDesperdicio'}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={razonesDesperdicio}
                    placeholder='Razón Desperdicio'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <Camera
              imageUri={imageUri}
              setImageUri={setImageUri}
              setFileName={setFileName}
            />

            <View style={styles.buttons}>
              <Pressable
                style={styles.button}
                onPress={clearForm}
              >
                <Text style={styles.buttonLegend}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit(onSubmit)}
                style={[styles.button, styles.sendButton]}
              >
                <Text style={styles.buttonLegend}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 350
  },
  permissionMessage: {
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474545',
    marginBottom: 10
  },
  dateTime: {
    flexDirection: 'row',
    gap: 20
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  textInput: {
    margin: 0,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  },
  button: {
    padding: 15,
    backgroundColor: '#fb630f',
    borderRadius: 10,
    width: 150
  },
  buttonLegend: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sendButton: {
    backgroundColor: '#fb630f',
  }
});