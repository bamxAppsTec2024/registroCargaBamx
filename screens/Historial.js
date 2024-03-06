import React from "react";
import { getData } from "../firebaseConfig";
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
  Button,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DataTable, Searchbar } from "react-native-paper";

import Tabla from "../components/Tabla";

const Historial = () => {
  const [donativo, setDonativo] = React.useState([]);
  const [donantes, setDonantes] = React.useState([]);
  const [donanteTotal, setDonanteTotal] = React.useState([]);

  React.useEffect(() => {
    const collectionRef = collection(getData, "donativo");
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
        }))
      );
    });

    return unsuscribe;
  }, []);

  const getMejores = async () => {
    const collectionRef = collection(getData, "donante");
    const q = query(collectionRef, orderBy("nombre", "desc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setDonativo(
        querySnapshot.docs.map((doc) => ({
          nombre: doc.data().nombre,
          cantidadCarga: doc.data().cantidadCarga,
          cantidadDesperdicio: doc.data().cantidadDesperdicio,
        }))
      );
    });
  };

  const getPeores = async () => {
    const collectionRef = collection(getData, "donante");
    const q = query(collectionRef, orderBy("nombre", "asc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setDonativo(
        querySnapshot.docs.map((doc) => ({
          nombre: doc.data().nombre,
          cantidadCarga: doc.data().cantidadCarga,
          cantidadDesperdicio: doc.data().cantidadDesperdicio,
        }))
      );
    });
  };

  const getCargaCiega = async () => {
    const collectionRef = collection(getData, "donativo");
    const q = query(collectionRef, where("cargaCiega", "==", true));

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
        }))
      );
    });
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
          <Searchbar placeholder="Buscar..." />
        </View>
        <View style={styles.btnSpace}>
          <TouchableOpacity style={styles.buttonIcon}>
            <AntDesign
              name="calendar"
              size={24}
              color="white"
              backgroundColor="#fb630f"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={getMejores} style={styles.button}>
            <Text style={styles.buttonLegend}>Mejores</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getPeores} style={styles.button}>
            <Text style={styles.buttonLegend}>Peores</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getCargaCiega} style={styles.button2}>
            <Text style={styles.buttonLegend2}>Carga Ciega</Text>
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView>
            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Id</DataTable.Title>
                  <DataTable.Title>Fecha</DataTable.Title>
                  <DataTable.Title>Conductor</DataTable.Title>
                  <DataTable.Title>Donativo</DataTable.Title>
                  <DataTable.Title>Donante</DataTable.Title>
                  <DataTable.Title>Tipo Carga</DataTable.Title>
                  <DataTable.Title>Cantidad</DataTable.Title>
                  <DataTable.Title>Carga Ciega</DataTable.Title>
                  <DataTable.Title>Desperdicio</DataTable.Title>
                  <DataTable.Title>% Desperdicio</DataTable.Title>
                  <DataTable.Title>Evidencia</DataTable.Title>
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
    width: 42,
    alignItems: "center",
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
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Historial;
