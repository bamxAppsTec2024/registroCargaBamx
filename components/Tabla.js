import * as React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

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
  uriFoto,
}) {
    return (
        <View styles={styles.tableContainer}>             
                <DataTable.Row>
                    <DataTable.Cell> {id} </DataTable.Cell>
                  {/*  <DataTable.Cell> {fecha} </DataTable.Cell>*/}
                    <DataTable.Cell> {conductor} </DataTable.Cell>
                    <DataTable.Cell> {donativo} </DataTable.Cell>
                    <DataTable.Cell> {donante} </DataTable.Cell>
                    <DataTable.Cell> {tipoCarga} </DataTable.Cell>
                    <DataTable.Cell> {cantidadCarga} </DataTable.Cell>
                    <DataTable.Cell> {cargaCiega} </DataTable.Cell>
                    <DataTable.Cell> {hayDesperdicio} </DataTable.Cell>
                    <DataTable.Cell> {porcentajeDesperdicio} </DataTable.Cell>
                    <DataTable.Cell> {razonDesperdicio} </DataTable.Cell>
                    <DataTable.Cell> Foto </DataTable.Cell>   
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
});