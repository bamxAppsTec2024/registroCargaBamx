import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from '@expo/vector-icons';

const Camera = ({ setImageUri, setFileName }) => {
  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();

        setImageUri(uri);
        setFileName(fileName);
        console.log('URI:', uri);
      }
    } catch (e) {
      Alert.alert("Error" + e.message);
    }
  };

  return (
    <View style={{ paddingBottom: 100 }}>
      <Text>Tomar fotografía</Text>
      <TouchableOpacity onPress={takePhoto}  >
        <FontAwesome5 name="camera" size={24} color="#EBB641" />
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
