import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const AddOtroField = ({showOtroField, placeholder, field, control}) => {
  return (
    <View>
      {showOtroField &&
        <View>
          <Text style={styles.label}>Agregar {field}</Text>
          <Controller
            control={control}
            name={`nuevo${field}`}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChange((text))}
                onBlur={onBlur}
                style={styles.textInput}
                placeholderTextColor={'black'}
              />
            )}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474545',
    marginBottom: 10
  },
  textInput: {
    margin: 0,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    fontSize: 16
  },
});

export default AddOtroField;