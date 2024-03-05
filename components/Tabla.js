import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
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
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title> Donativo </DataTable.Title>
                    <DataTable.Title> Donante </DataTable.Title>
                    <DataTable.Title> Tipo Carga </DataTable.Title>
                    <DataTable.Title> Conductor </DataTable.Title>
                    {/*<DataTable.Title> Evidencia </DataTable.Title>*/}
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell> {conductor} </DataTable.Cell>
                    <DataTable.Cell> {donante} </DataTable.Cell>
                    <DataTable.Cell> {donativo} </DataTable.Cell>
                    <DataTable.Cell> {} </DataTable.Cell>
                </DataTable.Row>
                
            </DataTable>
           {/* <Text>{conductor}</Text>
            <Text>{donante}</Text>
            <Text>{donativo}</Text>
    <Text>{uriFoto}</Text>*/}
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