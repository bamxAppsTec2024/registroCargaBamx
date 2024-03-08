import React, { useEffect, useState } from "react";
import {db} from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DataTable, Searchbar } from 'react-native-paper';

import Tabla from "../components/Tabla";
import ModalFotos from "../components/ModalFotos";

const Historial = () => {
  const searchBarFilter = async () => {
    const collectionRef = collection(db, "donativo");
    const q = query (collectionRef, where(getFilterVal, "in", "[conductor, donante, donativo, noComestible, noPerecedero, perecedero]"))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setDonativo(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          cantidadCarga: doc.data().cantidadCarga,
          cargaCiega: doc.data().cargaCiega,
          conductor: doc.data().conductor,
          donante: doc.data().donante,
          donativo: doc.data().donativo,
          fecha: doc.data().fecha,
          hayDesperdicio: doc.data().hayDesperdicio,
          porcentajeDesperdicio: doc.data().porcentajeDesperdicio,
          razonDesperdicio: doc.data().razonDesperdicio,
          tipoCarga: doc.data().tipoCarga,
          uriFoto: doc.data().uriFoto,
        })
        )
      )});
  };

  const [donativo, setDonativo] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const cambiarEstado = () => {
    setModalVisible (true);
    console.log(modalVisible)
    
  }


React.useEffect(() => {

  const collectionRef = collection(db, "donativo");
  const q = query(collectionRef, where("cantidadCarga", ">", "0"));

  const unsuscribe = onSnapshot(q, (querySnapshot) => {
    setDonativo(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        cantidadCarga: doc.data().cantidadCarga,
        cargaCiega: doc.data().cargaCiega,
        conductor: doc.data().conductor,
        donante: doc.data().donante,
        donativo: doc.data().donativo,
        fecha: doc.data().fecha,
        hayDesperdicio: doc.data().hayDesperdicio,
        porcentajeDesperdicio: doc.data().porcentajeDesperdicio,
        razonDesperdicio: doc.data().razonDesperdicio,
        tipoCarga: doc.data().tipoCarga,
        uriFoto: doc.data().uriFoto,
      })
      )
    )});

  return unsuscribe;
} , []);
  

  return (
    <SafeAreaView>
      
      <View style ={styles.container}>
        <Image source={require('../assets/logoBamx.png')} style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ver Historial</Text>
        </View>
        <View>
          <Searchbar
          placeholder="Buscar..."
          onChangeText={''}
          value={''}/>

        </View>
        <View style = {styles.btnSpace}>
          <Pressable style={styles.buttonIcon}>
            <AntDesign
            name="calendar" 
            size={24} color="white"
            backgroundColor='#fb630f'/></Pressable>
          
          <Pressable style={styles.button}>
            <Text style={styles.buttonLegend}>Mejores</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonLegend}>Peores</Text>
          </Pressable>

          <Pressable style={styles.button2}>
            <Text style={styles.buttonLegend2}>Carga Ciega</Text>
          </Pressable>
        </View>

        <Pressable style={styles.button2} onPress={cambiarEstado}>
          <Text style={styles.buttonLegend2}>Prueba Modal</Text>  
        </Pressable>
        <ModalFotos visible={modalVisible} modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        <View> 
            <ScrollView>
              <ScrollView horizontal>
              <DataTable >
                <DataTable.Header>
                  <DataTable.Title style={styles.tableTitle2}>Id</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Fecha</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Conductor</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Donativo</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Donante</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Tipo Carga</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Cantidad</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Carga Ciega</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Desperdicio</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>% Desperdicio</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Evidencia</DataTable.Title>
                </DataTable.Header>
                
              {donativo.map((donativo) => 
              (<Tabla {...donativo}/>)
              )}
              </DataTable>
              </ScrollView>   
          </ScrollView> 
        </View>

      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 150,
    alignSelf: 'center',
    marginTop:-15,
  },
  container: {
    paddingBottom: 350,
    margin: 30
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474545',
    marginBottom: 10
  },
  btnSpace: {
    flexDirection: 'row',
    gap: 5,
    paddingTop:15,
    paddingBottom:10
  },
  searchSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  },
  button: {
    padding: 6,
    backgroundColor: '#fb630f',
    borderRadius: 10,
    width: 78,
    alignContent: 'middle',
    justifyContent: 'center'
  },
  button2: {
    padding: 10,
    backgroundColor: '#fb630f',
    borderRadius: 10,
    width: 100,
    alignContent: 'middle',
    justifyContent: 'center'
  },
  buttonIcon: {
    padding: 10,
    backgroundColor: '#fb630f',
    borderRadius: 10,
    width: 42,
    alignItems: "center"
  },
  buttonLegend: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLegend2: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableTitle :{
    textAlign: "center",
    fontWeight:'bold',
    padding:10,
    width: 110
  },
  tableTitle2 :{
    textAlign: "center",
    fontWeight:'bold',
    padding:10,
    width: 50
  }
});

export default Historial;
