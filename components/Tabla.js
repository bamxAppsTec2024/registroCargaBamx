import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable} from "react-native";
import { DataTable } from "react-native-paper";
import ModalFotos from "./ModalFotos";

export default function Tabla({
  id,
  cantidadCarga,
  cargaCiega,
  conductor,
  donante,
  donativo,
  fecha,
  hayDesperdicio,
  porcentajeDesperdicio,
  razonDesperdicio,
  tipoCarga,
  cloudUrl,
  nombre,
  cantidadCargaUtil,
  cantidadDesperdicio,
  idDonativo
}) 
  
{  
  //genermos un estado para visibilidad de modal
  const [modalVisible, setModalVisible] = useState(false);
  
  //transformamos nuestro booleano de carga ciega para mostrar en la tabla
  const cargaCiegaTransform = cargaCiega ? "Sí" : "No";

    return (
        <View styles={styles.tableContainer}>             
                <DataTable.Row>
                    <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                    <DataTable.Cell style={[styles.cellContainer, { width: 100}]}> <Text>24/02/2024</Text> </DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 150}]}> {conductor}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 100}]}> {donativo}</DataTable.Cell>
                    <DataTable.Cell style={[styles.cellContainer, { width: 200}]}> {donante} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {tipoCarga} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {cantidadCarga} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {cargaCiegaTransform} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {hayDesperdicio} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {porcentajeDesperdicio} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {razonDesperdicio} </DataTable.Cell>
                    <DataTable.Cell>{nombre}</DataTable.Cell>
                    <DataTable.Cell>{cantidadCargaUtil}</DataTable.Cell>
                    <DataTable.Cell>{cantidadDesperdicio}</DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> 
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