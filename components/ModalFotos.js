import React, { useState, useEffect} from "react";
import { set } from "react-hook-form";
import {StyleSheet, Modal, View, Pressable, Image} from "react-native";

import { EvilIcons } from '@expo/vector-icons';

export const ModalFotos = ({modalVisible, setModalVisible, cloudUrl}) => {

  return (
    <View>
      {modalVisible && 
        <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
            <View style={styles.modalView}> 
            <Pressable onPress={(modalVisible) => setModalVisible(!modalVisible)}>
              <View style={styles.viewIcon}>
                <EvilIcons name="close" size={24} color="black"/>
              </View>
            </Pressable>
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
      backgroundColor: 'white',
      borderRadius: 20,
      
      padding:5,
      alignItems: 'center',
      backgroundColor:'#f2f3f3',
      elevation:5
    },
    imageView: {
      width: 250,
      height: 250,
      borderRadius:15
    },
    viewIcon:{
      alignItems:'flex-end',
      paddingBottom:5,
    }
  });

export default ModalFotos;
