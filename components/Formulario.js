import React from 'react';
import { useState, useEffect } from "react";
import { Button, Alert, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from 'react-hook-form';

import DropdownComponent from './Dropdown';
import Radio from './Radio';
import DateTimePicker from '@react-native-community/datetimepicker';
import Camera from './Camera';

import * as ImagePicker from "expo-image-picker";

import { uploadToFirebase, db, getCatalogoDropdown } from '../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';


export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [conductores, setConductores] = useState([]);
  const [donantes, setDonantes] = useState([]);
  const [razonesDesperdicio, setRazonesDesperdicio] = useState([]);
  const [donativos, setDonativos] = useState([]);

  // Obtener opciones de dropdown al consultar catálogos de base de datps
  useEffect(async () => {
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
  }, []);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      fecha: new Date(),
      conductor: '',
      donante: '',
      cargaCiega: false,
      tipoCarga: '',
      donativo: '',
      cantidadCarga: '',
      hayDesperdicio: true,
      porcentajeDesperdicio: '',
      razonDesperdicio: '',
      uriFoto: ''
    }
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
    const { fecha,
      conductor,
      donante,
      cargaCiega,
      tipoCarga,
      donativo,
      cantidadCarga,
      hayDesperdicio,
      porcentajeDesperdicio,
      razonDesperdicio,
      uriFoto } = formData;
    try {
      const docRef = await addDoc(collection(db, "donativo"), {
        fecha,
        conductor,
        donante,
        cargaCiega,
        tipoCarga,
        donativo,
        cantidadCarga,
        hayDesperdicio,
        porcentajeDesperdicio,
        razonDesperdicio,
        uriFoto
      });
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
      saveRecord(data);
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
      <View >
        <Text>Permiso de la cámara no está habilitado</Text>
        <StatusBar style="auto" />
        <Button title="Solicitar permiso" onPress={requestPermission}></Button>
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
          <Button
            title='Submit'
            onPress={handleSubmit(onSubmit)}
          />
          <View>
            <Text>Fecha</Text>
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

          <View>
            <Text>Hora</Text>
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
          <View>
            <Text>Conductor</Text>
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
            <Text>Donante</Text>
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
            <Text>¿Carga Ciega?</Text>
            <Controller
              control={control}
              name={'cargaCiega'}
              render={({ field: { value, onChange, onBlur } }) => (
                <Radio
                  data={dataCargaCiega}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View>
            <Text>Tipo de Carga</Text>
            <Controller
              control={control}
              name={'tipoCarga'}
              render={({ field: { value, onChange, onBlur } }) => (
                <Radio
                  data={dataTipoCarga}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>

          <View>
            <Text>Donativo</Text>
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
            <Text>Cantidad Carga</Text>
            <Controller
              control={control}
              name={'cantidadCarga'}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder='Cantidad carga'
                  value={value}
                  onChangeText={(text) => onChange((text))}
                  onBlur={onBlur}
                  style={{ paddingBottom: 100 }}
                />
              )}
            />
          </View>
          <View>
            <Text>¿Hay Desperdicio?</Text>
            <Controller
              control={control}
              name={'hayDesperdicio'}
              render={({ field: { value, onChange, onBlur } }) => (
                <Radio
                  data={dataHayDesperdicio}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View>
            <Text>Porcentaje Desperdicio</Text>
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
            <Text>Razón Desperdicio</Text>
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
            setImageUri={setImageUri}
            setFileName={setFileName}
          />

          {imageUri &&
            <View>
              <Text>La fotografía se ha subido</Text>
              <FontAwesome name="image" size={24} color="#B1B0B0" />
              <Image source={{ uri: imageUri }} style={{ height: 50, width: 50 }} />
            </View>
          }

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView >
  );
}

