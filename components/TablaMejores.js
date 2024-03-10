import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable} from "react-native";
import { DataTable } from "react-native-paper";

export default function TablaMejores({nombre, cantidadCargaUtil, cantidadDesperdicio, idDonativo, showMejores}) 

{  
    return (
        <View styles={styles.tableContainer}>      
        {showMejores&& 
          <DataTable.Row>
                    <DataTable.Cell style={[styles.cellContainer, { width: 50}]}>{idDonativo} </DataTable.Cell> 
                    <DataTable.Cell>{nombre}</DataTable.Cell>
                    <DataTable.Cell>{cantidadCargaUtil}</DataTable.Cell>
                    <DataTable.Cell>{cantidadDesperdicio}</DataTable.Cell>
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