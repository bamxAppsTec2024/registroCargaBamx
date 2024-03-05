import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

const Historial = () => {
  return (
    <SafeAreaView>
      <View style ={styles.container}>
        <Image source={require('../assets/logoBamx.png')} style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ver Historial</Text>
        </View>
        <View>
          <Searchbar
          placeholder="Buscar..."/>

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
    gap: 5
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
  }
});

export default Historial;
