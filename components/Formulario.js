import React from 'react';
import { useState, useEffect } from "react";
import {
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

import { Controller, useForm } from 'react-hook-form';

import DropdownComponent from './Dropdown';
import Radio from './Radio';
import Camera from './Camera';
import RequestCameraPermission from './RequestCameraPermission';
import { EvilIcons } from '@expo/vector-icons';

import { uploadToFirebase, getCatalogoDropdown, saveRecord, createRecordCatalogo, getRecordDonante } from '../firebaseConfig';

import {
  dataCargaCiega,
  dataHayDesperdicio,
  dataTipoCarga,
  crearArregloPorcentajes,
  unidadesCamiones,
  duracionDeCarga
} from '../utilities/utilities';


export default function App() {
  const [imageUri, setImageUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [conductores, setConductores] = useState([]);
  const [donantes, setDonantes] = useState([]);
  const [razonesDesperdicio, setRazonesDesperdicio] = useState([]);
  const [donativos, setDonativos] = useState([]);
  const [showOtroConductor, setShowOtroConductor] = useState(false);
  const [showOtroDonante, setShowOtroDonante] = useState(false);
  const [showOtroDonativo, setShowOtroDonativo] = useState(false);
  const [showOtroRazon, setShowOtroRazon] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValuesForm = {
    fecha: new Date(),
    unidadCamion: '',
    conductor: '',
    nuevoConductor: '',
    tiempoCarga: '',
    donante: '',
    nuevoDonante: '',
    cargaCiega: false,
    tipoCarga: 'Perecedero',
    donativo: '',
    nuevoDonativo: '',
    cantidadCarga: '',
    hayDesperdicio: true,
    porcentajeDesperdicio: '',
    razonDesperdicio: '',
    nuevoRazon: '',
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

  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm({
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

  // Craer opciones de porcentajes para dropdown 
  // porcentaje de desperdicio.
  const porcentajes = crearArregloPorcentajes();



  const watchConductor = watch('conductor');
  useEffect(() => {
    const { value } = watchConductor;
    setShowOtroConductor(value === 'Otro');
  }, [watchConductor]);

  const watchDonante = watch('donante');
  useEffect(() => {
    const { value } = watchDonante;
    setShowOtroDonante(value === 'Otro');
  }, [watchDonante]);

  const watchDonativo = watch('donativo');
  useEffect(() => {
    const { value } = watchDonativo;
    setShowOtroDonativo(value === 'Otro');
  }, [watchDonativo]);

  const watchRazon = watch('razonDesperdicio');
  useEffect(() => {
    const { value } = watchRazon;
    setShowOtroRazon(value === 'Otro');
  }, [watchRazon]);

  const watchCargaCiega = watch('cargaCiega');

  const calcularCantidadCarga = (nombreDonante, cantidadCarga, porcentajeDesperdicio) => {
    // Encotrar record
    getRecordDonante(nombreDonante, cantidadCarga, porcentajeDesperdicio);
  };


  // Función para structurar datos como se enviarán a la base de datos
  const estructurarData = (data, downloadUrl) => {
    data.unidadCamion = data.unidadCamion.value;
    data.conductor = data.conductor.value;
    data.tiempoCarga = data.tiempoCarga.value;
    data.donante = data.donante.value;
    data.donativo = data.donativo.value;
    data.porcentajeDesperdicio = data.porcentajeDesperdicio.value;
    data.razonDesperdicio = data.razonDesperdicio.value;
    data.uriFoto = imageUri;
    data.cloudUrl = downloadUrl;

    if (data.nuevoConductor) {
      createRecordCatalogo('conductor', data.nuevoConductor);
      data.conductor = data.nuevoConductor;
    }

    if (data.nuevoDonante) {
      createRecordCatalogo('donante', data.nuevoDonante);
      data.donante = data.nuevoDonante;
    }
    if (data.nuevoRazon) {
      createRecordCatalogo('razonDesperdicio', data.nuevoRazon);
      data.razonDesperdicio = data.nuevoRazon;
    }

    if (data.nuevoDonativo) {
      createRecordCatalogo(dicTiposDonativos[watchTipoCarga], data.nuevoDonativo);
      data.donativo = data.nuevoDonativo;
    }
    calcularCantidadCarga(data.donante, data.cantidadCarga, data.porcentajeDesperdicio);
    // Eliminar hora de la data debido a que se incluye en fecha al crear new Date()
    delete data.hora;
    delete data.nuevoConductor;
    delete data.nuevoDonante;
    delete data.nuevoRazon;
    delete data.nuevoDonativo;
  };

  useEffect(() => {
    if (imageUri !== '' && !watchCargaCiega) {
      setCameraError(false);
    }
  }, [imageUri]);


  const onSubmit = async (data) => {
    // Si la carga no es ciega, se muestra errror si falta la foto
    if (imageUri === '' && !watchCargaCiega) {
      setCameraError(true);
      return;
    }

    // Si la carga es ciega, borrar valores predeterminados 
    // de los radios y hacer que donativo no sea undefined
    // porque se genera a partir del tipo de carga
    if (watchCargaCiega) {
      data.donativo = '';
      data.tipoCarga = '';
      data.hayDesperdicio = '';
      data.porcentajeDesperdicio = '';
      data.razonDesperdicio = '';
    }

    console.log(data);
    try {
      setLoading(true);
      // Si la carga no es ciega, subir foto
      if (!watchCargaCiega) {
        const uploadResp = await uploadToFirebase(imageUri, fileName, (v) =>
          console.log(v)
        ).then((uploadResp) => {
          const myJSON = JSON.stringify(uploadResp);
          const obj = JSON.parse(myJSON);

          estructurarData(data, obj.downloadUrl);
          clearForm(); // Limpiar los campos del formulario
        });

      }
      saveRecord(data); // Guardar record en la base de datos
    } catch (e) {
      Alert.alert("Error" + e.message);
    }
    setLoading(false);
  };

  // Componente que solicita permiso a la cámara
  <RequestCameraPermission />;

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
            
            <View>
              <Text style={styles.label}>Unidad Camión</Text>
              <Controller
                control={control}
                name={'unidadCamion'}
                rules={{
                  required: { value: true, message: "Unidad camión es obligatoria" },
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={unidadesCamiones}
                    placeholder='Unidad Camión'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.unidadCamion &&
              <Text style={styles.error}>
                {errors.unidadCamion.message}
              </Text>
            }
            <View>
              <Text style={styles.label}>Conductor</Text>
              <Controller
                control={control}
                name={'conductor'}
                rules={{
                  required: { value: true, message: "Conductor es obligatorio" },
                }}
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
            {errors.conductor &&
              <Text style={styles.error}>
                {errors.conductor.message}
              </Text>
            }

            {showOtroConductor &&
              <View>
                <Text style={styles.label}>Agregar Conductor</Text>
                <Controller
                  control={control}
                  name='nuevoConductor'
                  rules={{
                    required: { value: true, message: "Agregar conductor es obligatorio" },
                  }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      placeholder='Agregar Conductor'
                      value={value}
                      onChangeText={(text) => onChange((text))}
                      onBlur={onBlur}
                      style={styles.textInput}
                      placeholderTextColor={'black'}
                    />
                  )}
                />
              </View>
            }

            {showOtroConductor && errors.nuevoConductor &&
              <Text style={styles.error}>
                {errors.nuevoConductor.message}
              </Text>
            }
            <View>
              <Text style={styles.label}>Tiempo Empleado en Cargar Camión</Text>
              <Controller
                control={control}
                name={'tiempoCarga'}
                rules={{
                  required: { value: true, message: "Tiempo de carga es obligatorio" },
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DropdownComponent
                    data={duracionDeCarga}
                    placeholder='Tiempo de Carga'
                    secureTextEntry
                    val={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.tiempoCarga &&
              <Text style={styles.error}>
                {errors.tiempoCarga.message}
              </Text>
            }

            <View>
              <Text style={styles.label}>Donante</Text>
              <Controller
                control={control}
                name={'donante'}
                rules={{
                  required: { value: true, message: "Donante es obligatorio" },
                }}
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
            {errors.donante &&
              <Text style={styles.error}>
                {errors.donante.message}
              </Text>
            }

            {showOtroDonante &&
              <View>
                <Text style={styles.label}>Agregar Donante</Text>
                <Controller
                  control={control}
                  name='nuevoDonante'
                  rules={{
                    required: { value: true, message: "Agregar donante es obligatorio" },
                  }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      placeholder='Agregar Donante'
                      value={value}
                      onChangeText={(text) => onChange((text))}
                      onBlur={onBlur}
                      style={styles.textInput}
                      placeholderTextColor={'black'}
                    />
                  )}
                />
              </View>
            }

            {showOtroDonante && errors.nuevoDonante &&
              <Text style={styles.error}>
                {errors.nuevoDonante.message}
              </Text>
            }

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
            {
              !watchCargaCiega &&
              <View>
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
                    rules={{
                      required: { value: true, message: "Donativo es obligatorio" },
                    }}
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
                {errors.donativo &&
                  <Text style={styles.error}>
                    {errors.donativo.message}
                  </Text>
                }

                {showOtroDonativo &&
                  <View>
                    <Text style={styles.label}>Agregar Donativo</Text>
                    <Controller
                      control={control}
                      name='nuevoDonativo'
                      rules={{
                        required: { value: true, message: "Agregar donativo es obligatorio" },
                      }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput
                          placeholder='Agregar Donativo'
                          value={value}
                          onChangeText={(text) => onChange((text))}
                          onBlur={onBlur}
                          style={styles.textInput}
                          placeholderTextColor={'black'}
                        />
                      )}
                    />
                  </View>
                }

                {showOtroDonativo && errors.nuevoDonativo &&
                  <Text style={styles.error}>
                    {errors.nuevoDonativo.message}
                  </Text>
                }

                <View>
                  <Text style={styles.label}>Cantidad Carga (toneladas)</Text>
                  <Controller
                    control={control}
                    name={'cantidadCarga'}
                    rules={{
                      validate: {
                        required: (value) => {
                          if (!value) return 'Cantidad de carga es obligatoria';
                          if (isNaN(value)) return 'Ingrese una cantidad válida';
                        }
                      }
                    }}
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
                {errors.cantidadCarga &&
                  <Text style={styles.error}>
                    {errors.cantidadCarga.message}
                  </Text>
                }

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
                    rules={{
                      required: { value: true, message: "Porcentaje desperdicio es obligatorio" },
                    }}
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
                {errors.porcentajeDesperdicio &&
                  <Text style={styles.error}>
                    {errors.porcentajeDesperdicio.message}
                  </Text>
                }

                <View>
                  <Text style={styles.label}>Razón Desperdicio</Text>
                  <Controller
                    control={control}
                    name={'razonDesperdicio'}
                    rules={{
                      required: { value: true, message: "Razón desperdicio es obligatoria" },
                    }}
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
                {errors.razonDesperdicio &&
                  <Text style={styles.error}>
                    {errors.razonDesperdicio.message}
                  </Text>
                }

                {showOtroRazon &&
                  <View>
                    <Text style={styles.label}>Agregar Razón</Text>
                    <Controller
                      control={control}
                      name='nuevoRazon'
                      rules={{
                        required: { value: true, message: "Agregar razón es obligatorio" },
                      }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput
                          placeholder='Agregar Razón'
                          value={value}
                          onChangeText={(text) => onChange((text))}
                          onBlur={onBlur}
                          style={styles.textInput}
                          placeholderTextColor={'black'}
                        />
                      )}
                    />
                  </View>
                }

                {showOtroRazon && errors.nuevoRazon &&
                  <Text style={styles.error}>
                    {errors.nuevoRazon.message}
                  </Text>
                }

                {!watchCargaCiega &&
                  <View>
                    <Camera
                      imageUri={imageUri}
                      setImageUri={setImageUri}
                      setFileName={setFileName}
                    />
                  </View>
                }
                {!watchCargaCiega && cameraError &&
                  <Text style={styles.error}>
                    Fotografía es obligatoria
                  </Text>
                }
              </View>
            }
            
            {loading &&
              <View>
                <EvilIcons name="spinner" size={40} color="black" style={styles.spinner}/>
                <Text style={styles.submitmessage}>Enviando datos</Text>
              </View>
            }

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
  datePicker: {
    width: 200,
    borderColor: 'black',
    backgroundColor: '#FAFAFA'
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
  },
  error: {
    fontSize: 16,
    marginBottom: 25,
    color: 'red'
  },
  spinner: {
    marginTop: 25,
    alignSelf: 'center'
  },
  submitmessage: {
    margin: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'Bold'
  }
});