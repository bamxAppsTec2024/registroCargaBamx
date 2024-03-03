import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

// Componente para generar opciones de radio dinámicamente 
// Utilizando librería 'react-native-paper'
const Radio = ({ data, value, onChange, onBlur }) => {
  return (
    <RadioButton.Group onValueChange={onChange} value={value} onBlur={onBlur}>
      {data.map(option => (
        <View>
          <Text>{option.label}</Text>
          <RadioButton value={option.value} />
        </View>
      ))}

    </RadioButton.Group>
  );
};

export default Radio;
