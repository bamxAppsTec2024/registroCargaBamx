import * as React from "react";
import { View } from "react-native";

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
            <Text>{cantidadCarga}</Text>
            <Text>{cargaCiega}</Text>
            <Text>{conductor}</Text>
            <Text>{donante}</Text>
            <Text>{donativo}</Text>
            <Text>{fecha}</Text>
            <Text>{hayDesperdicio}</Text>
            <Text>{porcentajeDesperdicio}</Text>
            <Text>{razonDesperdicio}</Text>
            <Text>{tipoCarga}</Text>
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