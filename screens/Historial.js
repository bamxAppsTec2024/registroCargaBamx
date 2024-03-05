import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { getData } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react/cjs/react.production.min';


const Historial = () => {
  const [donativo, setDonativo] = useState();

  useEffect(() => {
    const collectionRef = collection(getData, 'donativo');
    const q = query(collectionRef, orderBy('fecha', 'desc'));

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setDonativo(
        querySnapshot.docs.map(doc => ({
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
          uriFoto: doc.data().uriFoto
        }))
      )
    });

    return unsuscribe;
  }, []);

  return (
    <SafeAreaView>
      <View>
        {donativo.map(donativo => <Tabla key={donativo.id} {...donativo}/>)}
      </View>
    </SafeAreaView>
  );
};

export default Historial;
