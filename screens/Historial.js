import React, { useState } from "react";
import { db } from "../firebaseConfig";
import {collection, onSnapshot, or, orderBy, query, where, } from "firebase/firestore";

import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, ScrollView, Alert, TouchableOpacity, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DataTable, Searchbar } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

import Tabla from "../components/Tabla";

const Historial = () => {
  const [donativo, setDonativo] = React.useState([]);
  const [FilterVal, setFilterVal] = React.useState("");

  //Creamos un estado para mostrar los campos correspondientes 
  //al filtro de mejores
  const [showMejores, setShowMejores] = useState(false);
  const [showPeores, setShowPeores] = useState(false);
  const [showCargaCiega, setShowCargaCiega] = useState(false);
  const [showHistorial, setShowHistorial] = useState(true);

  //Generamos estados paginación para la tabla 
  const [page, setPage] = useState(0);

  //Definimos cuántos itempos por página vamos a mostrar
  const [numberOfItemsPerPageList] = React.useState([5, 6, 7]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0] );
  
  //Calculamos cuántas páginas se necesitaran basado en los 
  //elementos por página
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, donativo.length);

  
  React.useEffect(() => {
    const collectionRef = collection(db, "donativo");
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


  function searchButton() {
    try {
      console.log(FilterVal);
      const value = FilterVal ? FilterVal : " ";

      const collectionRef = collection(db, "donativo");
      const q = query(collectionRef,
        or(where('cantidadCarga', '==', value),
           where('cargaCiega', '==', value),
           where('cloudUrl', '==', value),
           where('conductor', '==', value),
           where('donante', '==', value),
           where('donativo', '==', value),
           where('fecha', '==', value),
           where('hayDesperdicio', '==', value),
           where('porcentajeDesperdicio', '==', value),
           where('razonDesperdicio', '==', value),
           where('tiempoCarga', '==', value),
           where('tipoCarga', '==', value),
           where('unidadCamion', '==', value),
           where('uriFoto', '==', value)
        )
      );
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
    } catch (e) {
      Alert.alert("Error" + e.message);
    }
  }

  //autogeneración de IDs en tabla para evitar usar 
  //los id generados por Firebase
  const donativoIds = donativo.map((donativo, index) => {    
    return{ 
      ...donativo,
    idDonativo: index + 1,
    };
  });


  const displayHistorial = async () => {
    setShowMejores(false);
    setShowCargaCiega(false);
    setShowPeores(false);
    setShowHistorial(true);

    const collectionRef = collection(db, "donativo");
    const q = query(collectionRef, orderBy("cantidadCarga", "asc"));
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
  }

  const getMejores = async () => {
    const collectionRef = collection(db, "donante");
    const q = query(collectionRef, orderBy("cantidadCargaUtil", "asc"));

    //al hacer click en el filtro cambiamos los estados de los otros filtros
    //esto en dado caso que se hayan usado anteriormente
    setShowMejores(true);
    setShowCargaCiega(false);
    setShowPeores(false);
    setShowHistorial(false);

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
    const collectionRef = collection(db, "donante");
    const q = query(collectionRef, orderBy("cantidadDesperdicio", "desc"));

    setShowMejores(false);
    setShowCargaCiega(false);
    setShowPeores(true);
    setShowHistorial(false);

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
    const collectionRef = collection(db, "donativo");
    const q = query(collectionRef, where("cargaCiega", "==", true));

    setShowMejores(false);
    setShowCargaCiega(true);
    setShowPeores(false);
    setShowHistorial(false);

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
        })
        )
      )
    });

    
  }

  return (
    <SafeAreaView>
    <View style={styles.containerMain}>
      <View style={styles.container}>
        <Image source={require("../assets/logoBamx.png")} style={styles.logo} />
        <View style={styles.innerContainer}>
          <Pressable onPress={displayHistorial}>
            <Text style={styles.title}>Ver Historial</Text>
          </Pressable>

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
          <TouchableOpacity onPress={displayHistorial} style={[styles.buttonIcon]}>
            <MaterialIcons name="cancel" size={25} color="white" backgroundColor="#fb630f"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={getMejores} style={[styles.button, showMejores && styles.buttonPressed]}>
            <Text style={styles.buttonLegend}>Mejores</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getPeores}style={[styles.button, showPeores && styles.buttonPressed]} >
            <Text style={styles.buttonLegend}>Peores</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getCargaCiega} style={[styles.button, showCargaCiega && styles.buttonPressed]}>
            <Text style={styles.buttonLegend2}>Carga Ciega</Text>
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView>
            <ScrollView horizontal>
              <DataTable>
                {showHistorial &&
                  <DataTable.Header>
                    <DataTable.Title style={[styles.tableTitle, { width: 50 }]}>Id</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Conductor</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Donativo</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 200 }]}>Donante</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Tipo Carga</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 80}]}>Cantidad</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 100}]}>Carga Ciega</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 130}]}>¿Hay desperdicio?</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 120}]}>% Desperdicio</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 140}]}>Razón Desperdicio</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 100}]}>Evidencia</DataTable.Title>
                  </DataTable.Header>}

                {showMejores &&
                  <DataTable.Header>
                    <DataTable.Title style={[styles.tableTitle, { width: 50 }]}>Id</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 200 }]}>Donante</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Cantidad de Carga Útil</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 180 }]}>Cantidad de Desperdicio</DataTable.Title>
                  </DataTable.Header>}

                {showPeores &&
                   <DataTable.Header>
                   <DataTable.Title style={[styles.tableTitle, { width: 50 }]}>Id</DataTable.Title>
                   <DataTable.Title style={[styles.tableTitle, { width: 200 }]}>Donante</DataTable.Title>
                   <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Cantidad de Carga Útil</DataTable.Title>
                   <DataTable.Title style={[styles.tableTitle, { width: 180 }]}>Cantidad de Desperdicio</DataTable.Title>
                 </DataTable.Header>}

                {showCargaCiega &&
                  <DataTable.Header>
                    <DataTable.Title style={[styles.tableTitle, { width: 50 }]}>Id</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Conductor</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 150 }]}>Donante</DataTable.Title>
                    <DataTable.Title style={[styles.tableTitle, { width: 100 }]}>Carga Ciega</DataTable.Title>
                  </DataTable.Header>}

                {donativoIds.slice(from,to).map((objDonativo) => (
                  <Tabla key={objDonativo.idDonativo} {...objDonativo}
                    showMejores={showMejores}
                    showPeores={showPeores}
                    showHistorial={showHistorial}
                    showCargaCiega={showCargaCiega}
                  />
                ))}

                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(donativo.length / itemsPerPage)}
                  onPageChange={(page) => setPage(page)}
                  label={`${from + 1}-${to} of ${donativo.length}`}
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={itemsPerPage}
                  onItemsPerPageChange={onItemsPerPageChange}
                  showFastPaginationControls
                  selectPageDropdownLabel={'Rows per page'}
                  style = {styles.tableNav}
                />

              </DataTable>
            </ScrollView>
          </ScrollView>
        </View>
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
    marginTop:-20
  },
  containerMain: {
    margin: 30
  },
  container: {
    paddingBottom: 2000
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
  buttonPressed: {
    padding: 6,
    backgroundColor: "#e7a716",
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
    height: 50,
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
  tableTitle: {
    justifyContent: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  tableNav: {
    justifyContent: 'flex-start',
  },
});

export default Historial;
