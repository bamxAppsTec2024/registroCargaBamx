import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Alert, Pressable, StyleSheet, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from '@expo/vector-icons';

const Camera = ({ setImageUri, setFileName, imageUri }) => {
  const [ loadImage, setLoadImage ] = useState(false);
  useEffect(() => {
    setLoadImage(imageUri != '');
  }, [imageUri]);

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
      }
    } catch (e) {
      Alert.alert("Error" + e.message);
    }
  };

  return (
    <View >
      <View style={styles.camera}>
          <Text style={styles.label}>Tomar Fotografía</Text>
          <Pressable onPress={takePhoto}  >
            <FontAwesome5 name="camera" size={60} color="#EBB641" />
          </Pressable>
      </View>

      {loadImage ?
        <View>
          <Image source={{ uri: imageUri }} style={styles.photo} />
        </View>
        :
        <Text style={styles.legend}>Aún no has tomado una fotografía</Text>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474545',
    marginBottom: 10,
  },
  legend: {
    fontSize: 16,
    marginBottom: 10
  },
  photo: {
    width: 350,
    height: 350,
    alignSelf: 'center',
    borderRadius: 10 
  }
});

export default Camera;

