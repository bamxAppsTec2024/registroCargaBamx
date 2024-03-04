import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

// Componente para generar opciones de radio dinámicamente 
// Utilizando librería 'react-native-paper'
const Radio = ({ data, value, onChange, onBlur, horizontalOptions }) => {
  return (
    <RadioButton.Group onValueChange={onChange} value={value} onBlur={onBlur}  >
      <View style={horizontalOptions && styles.cargaCiega}>
        {data.map(option => (
          <View style={styles.labelValue}>
            <RadioButton value={option.value} color='#474545' />
            <Text style={styles.radioLabel}>{option.label}</Text>
          </View>
        ))}
      </View>

    </RadioButton.Group>
  );
};

export default Radio;

const styles = StyleSheet.create({
  labelValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cargaCiega: {
    flexDirection: 'row',
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 30,
    marginRight: 60,
  }
});
