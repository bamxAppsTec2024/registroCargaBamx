import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

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
            <Text>{conductor}</Text>
            <Text>{donante}</Text>
            <Text>{donativo}</Text>
            <Text>{uriFoto}</Text>
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