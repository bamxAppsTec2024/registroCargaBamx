import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable} from "react-native";
import { DataTable } from "react-native-paper";
import ModalFotos from "./ModalFotos";
import PropTypes from 'prop-types';


export default function Tabla({
  id, cantidadCarga, cargaCiega, conductor,
  donante, donativo, fecha, hayDesperdicio, porcentajeDesperdicio,
  razonDesperdicio, tipoCarga, cloudUrl, nombre, cantidadCargaUtil,
  cantidadDesperdicio, idDonativo, showMejores, showPeores,
  showHistorial, showCargaCiega
}) 
  
{  
  //genermos un estado para visibilidad de modal
  const [modalVisible, setModalVisible] = useState(false);
  
  //transformamos nuestro booleano de carga ciega para mostrar en la tabla
  const cargaCiegaTransform = cargaCiega ? "Sí" : "No";
  hayDesperdicio= hayDesperdicio ? "Sí" : "No";

  //Limitamos a 2 decimales los resultados de cantidad de carga útil y 
  //cantidad de desperdicio recibidos
  if(showMejores || showPeores)
  {   
    parseFloat(cantidadCargaUtil);
    cantidadCargaUtil = Math.round(cantidadCargaUtil * 100) / 100;

    parseFloat(cantidadDesperdicio);
    cantidadDesperdicio = Math.round(cantidadDesperdicio * 100) / 100;
  }

   //TO DO: REVISAR BUG CUANDO VOLVEMOS A TABLAS CON FECHAS
   //DESPUES DE VENIR DE MEJORES O PEORES. FECHA APARECE COMO UNDEFINDED
   //ESTO SUCEDE AL OBTENER DATOS DE MEJORES O PEORES DEBIDO A QUE NO 
   //EXISTE UN CAMPO FECHA

    return (
        <View styles={styles.tableContainer}>    
          {showHistorial&&
            <DataTable.Row>
                    <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                    <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {conductor}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {donativo}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 200}]}> {donante} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {tipoCarga} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 80}]}> {cantidadCarga} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 100}]}> {cargaCiegaTransform} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 130}]}> {hayDesperdicio} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 120}]}> {porcentajeDesperdicio} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 140}]}> {razonDesperdicio} </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 100}]}> 
                        <Pressable style={styles.button2} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buttonLegend}>Ver foto</Text>
                        </Pressable>
                        <ModalFotos 
                          visible={modalVisible} 
                          modalVisible={modalVisible} 
                          setModalVisible={setModalVisible} 
                          cloudUrl = {cloudUrl}/>
                    </DataTable.Cell>   
                </DataTable.Row>
              }         
                 
                {showMejores && 
                 <DataTable.Row>
                  <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                  <DataTable.Cell style={[styles.cellContainer, { width: 200}]}>{nombre}</DataTable.Cell>
                  <DataTable.Cell style={[styles.cellContainer, { width: 150}]}>{cantidadCargaUtil}</DataTable.Cell>
                  <DataTable.Cell style={[styles.cellContainer, { width: 180}]}>{cantidadDesperdicio}</DataTable.Cell>
                </DataTable.Row>    
                } 

                {showPeores && 
                  <DataTable.Row>
                    <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                    <DataTable.Cell style={[styles.cellContainer, { width: 200}]}>{nombre}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 150}]}>{cantidadCargaUtil}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 180}]}>{cantidadDesperdicio}</DataTable.Cell>
                  </DataTable.Row>    
                } 

              {showCargaCiega && 
                 <DataTable.Row>
                  <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                  <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {conductor}</DataTable.Cell>
                  <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {donante} </DataTable.Cell>
                  <DataTable.Cell style={[styles.cellContainer, { width: 100}]}> {cargaCiegaTransform} </DataTable.Cell> 
                 </DataTable.Row>     
                } 
       </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8
    },
    cellContainer: {
      padding:10,
      height:50,
      justifyContent:'center',
    },
    button2: {
        padding: 10,
        backgroundColor: '#fb630f',
        borderRadius: 10,
        width: 60,
        alignContent: 'middle',
        justifyContent: 'center'
      },
      buttonLegend: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});