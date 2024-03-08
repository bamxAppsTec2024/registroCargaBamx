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
  cantidadDesperdicio
}) 
  
{  
  const [modalVisible, setModalVisible] = useState(false);
  //console.log(cloudUrl);

    return (
        <View styles={styles.tableContainer}>             
                <DataTable.Row>
                    {/* <DataTable.Cell style ={styles.cellContainer2}> <Text>1</Text> </DataTable.Cell> */}
                    <DataTable.Cell style ={styles.cellContainer}> 
                      <Text>24/02/2024</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {conductor}</DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> 
                      <Text textBreakStrategy="balanced">{donativo}</Text> </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {donante} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {tipoCarga} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {cantidadCarga} </DataTable.Cell>
                    <DataTable.Cell style ={styles.cellContainer}> {cargaCiega} </DataTable.Cell>
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
      width: 100,
      height:50,
      textAlign:'center',
      flex:1,
      flexWrap:'wrap'
    },
    cellContainer2: {
      padding:10,
      width: 50,
      textAlign:'center'
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