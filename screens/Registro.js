import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import Formulario from '../components/Formulario';

const Registro = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={require('../assets/logoBamx.png')} style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registrar Carga</Text>
        </View>
        <Formulario/>
      </View>
    </SafeAreaView>


  );
};

export default Registro;

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 150,
    alignSelf: 'center',
    marginTop:-15
  },
  container: {
    margin: 30
  },
  innerContainer: {
    alignItems:'flex-start',
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 10
  }
});
