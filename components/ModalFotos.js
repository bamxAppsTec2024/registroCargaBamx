import React, { useState, useEffect} from "react";
import { set } from "react-hook-form";
import {StyleSheet, Modal, View, Pressable, Text, Image} from "react-native";


export const ModalFotos = ({modalVisible, setModalVisible, cloudUrl}) => {

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
              <Image source={{uri:cloudUrl}} style={styles.imageView}/>
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
    imageView: {
      width: 200,
      height: 200
    }
  });

export default ModalFotos;
