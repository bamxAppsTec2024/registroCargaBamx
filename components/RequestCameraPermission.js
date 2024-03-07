import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

const RequestCameraPermission = () => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  // Verificar si la aplicación tiene acceso a la cámara del celular
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View>
        <Text style={styles.permissionMessage}>Permiso de la cámara no está habilitado</Text>
        <StatusBar style="auto" />
        <Button title="Solicitar permiso" onPress={requestPermission} style={{ justifyContent: 'center' }}></Button>
      </View>
    );
  }
};

export default RequestCameraPermission;
