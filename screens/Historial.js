import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { getData } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react/cjs/react.production.min";
import Tabla from "../components/Tabla";

const Historial = () => {
/* 
const [donativo, setDonativo] = React.useState([]);

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
      })
      )
    )});

  return unsuscribe;
}, []);
*/
  



  return (
    <SafeAreaView>

      {/* 
      <ScrollView>
        {donativo.map((donativo) => 
          (<Tabla {...donativo}/>)
        )}
      </ScrollView>
      */}
    </SafeAreaView>
  );
};

export default Historial;
