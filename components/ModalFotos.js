import React, { useState, useEffect} from "react";
import { set } from "react-hook-form";
import {StyleSheet, Modal, View, Pressable, Text} from "react-native";


export const ModalFotos = ({modalVisible, setModalVisible}) => {

  return (
    <View>
      {modalVisible && 
        <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View>
            <Pressable onPress={(modalVisible) => setModalVisible(!modalVisible)}>
              <Text>Cerrar</Text>
            </Pressable>
          </View>
            <View style={styles.modalView}>
                <Text>Imagen</Text>
            </View> 
        </View>
      </Modal>
      }

    </View>

  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
    },
  });

export default ModalFotos;
