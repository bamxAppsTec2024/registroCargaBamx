import React from 'react';
import { SafeAreaView, View, Text, Stylesheet } from 'react-native';
import Formulario from '../components/Formulario';

const Registro = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Registrar Carga</Text>
        <Formulario />
      </View>
    </SafeAreaView>


  );
};

export default Registro;
