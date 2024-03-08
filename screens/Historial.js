import React, { useState } from "react";
import {db} from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DataTable, Searchbar } from "react-native-paper";

import Tabla from "../components/Tabla";
import ModalFotos from "../components/ModalFotos";

const Historial = () => {
  const [donativo, setDonativo] = React.useState([]);
  const [FilterVal, setFilterVal] = React.useState("");

  React.useEffect(() => {
    const collectionRef = collection(getData, "donativo");
    const q = query(collectionRef, orderBy("cantidadCarga", "desc"));
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
          cloudUrl: doc.data().cloudUrl,
        }))
      );
    });

    return unsuscribe;
  }, []);

  /* function FindFilterVal(FilterVal) {
    return donativo.find(FilterVal => donativo === FilterVal);
  } */

  function searchButton () {
    try {
      console.log(FilterVal);

    } catch (e) {
      Alert.alert("Error" + e.message);
    }
  }

  const getMejores = async () => {
    const collectionRef = collection(getData, "donante");
    const q = query(collectionRef, orderBy("cantidadCargaUtil", "desc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setDonativo(
        querySnapshot.docs.map((doc) => ({
          nombre: doc.data().nombre,
          cantidadCargaUtil: doc.data().cantidadCargaUtil,
          cantidadDesperdicio: doc.data().cantidadDesperdicio,
        }))
      );
    });
  };

  const getPeores = async () => {
    const collectionRef = collection(getData, "donante");
    const q = query(collectionRef, orderBy("cantidadDesperdicio", "desc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setDonativo(
        querySnapshot.docs.map((doc) => ({
          nombre: doc.data().nombre,
          cantidadCargaUtil: doc.data().cantidadCargaUtil,
          cantidadDesperdicio: doc.data().cantidadDesperdicio,
        }))
      );
    });
  };

  const getCargaCiega = async () => {
    const collectionRef = collection(getData, "donativo");
    const q = query(collectionRef, where("cargaCiega", "==", false));

    

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
        cloudUrl: doc.data().cloudUrl,
      })
      )
    )});

  return unsuscribe;
};
  

  return (
    <SafeAreaView>
      {/* 
      <ScrollView>
        {donativo.map((donativo) => 
          (<Tabla {...donativo}/>)
        )}
      </ScrollView>
      */}

      <View style={styles.container}>
        <Image source={require("../assets/logoBamx.png")} style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ver Historial</Text>
        </View>
        <View>
          <Searchbar
            placeholder="Buscar..."
            onChangeText={setFilterVal}
            value={FilterVal}
            onIconPress={searchButton}
          />
        </View>
        <View style={styles.btnSpace}>
          <Pressable style={styles.buttonIcon}>
            <AntDesign
              name="calendar"
              size={24}
              color="white"
              backgroundColor="#fb630f"
            />
          </Pressable>

          <Pressable onPress={getMejores} style={styles.button}>
            <Text style={styles.buttonLegend}>Mejores</Text>
          </Pressable>

          <Pressable onPress={getPeores} style={styles.button}>
            <Text style={styles.buttonLegend}>Peores</Text>
          </Pressable>

          <Pressable onPress={getCargaCiega} style={styles.button2}>
            <Text style={styles.buttonLegend2}>Carga Ciega</Text>
          </Pressable>
        </View>

        <View>
          <ScrollView>
            <ScrollView horizontal>
              <DataTable>
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

                {donativo.map((donativo) => (
                  <Tabla {...donativo} />
                ))}
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
    alignSelf: "center",
    marginTop: -15,
  },
  container: {
    paddingBottom: 350,
    margin: 30,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#474545",
    marginBottom: 10,
  },
  btnSpace: {
    flexDirection: "row",
    gap: 5,
    paddingTop: 15,
    paddingBottom: 10,
  },
  searchSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  button: {
    padding: 6,
    backgroundColor: "#fb630f",
    borderRadius: 10,
    width: 78,
    alignContent: "middle",
    justifyContent: "center",
  },
  button2: {
    padding: 10,
    backgroundColor: "#fb630f",
    borderRadius: 10,
    width: 100,
    alignContent: "middle",
    justifyContent: "center",
  },
  buttonIcon: {
    padding: 10,
    backgroundColor: "#fb630f",
    borderRadius: 10,
    width: 50,
    height:50,
    alignItems: "center"
  },
  buttonLegend: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonLegend2: {
    color: "white",
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
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
