// Zona 1, IMPORTACIONES
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

// Zona 2, MAIN (ejecución del programa)
export default function App() {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [comments, setComments] = useState('');
  const [age, setAge] = useState('');

  // Mostrar alerta con validación
  const showAlert = () => {
    if (nombre.trim() === '' || password.trim() === '' || age.trim() === '') {
      window.alert('Por favor, completa todos los campos obligatorios.');
    } else {
      window.alert(`Nombre: ${nombre}\nContraseña: ${password}\nEdad: ${age}\nComentarios: ${comments}`);
    }
  };

  // Limpiar todos los campos
  const limpiarCampos = () => {
    setNombre('');
    setPassword('');
    setComments('');
    setAge('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Escribe tu nombre" 
        value={nombre} 
        onChangeText={setNombre} 
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Escribe tu contraseña" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry={true} 
      />

      <Text style={styles.label}>Edad:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Escribe tu edad" 
        value={age} 
        onChangeText={setAge} 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Comentarios:</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Escribe tus comentarios" 
        value={comments} 
        onChangeText={setComments} 
        multiline={true} 
        numberOfLines={4} 
        textAlignVertical="top" 
      />

      <Text style={styles.label}>Campo de alerta (solo lectura):</Text>
      <TextInput 
        style={styles.input} 
        value="Este campo es solo de lectura" 
        editable={false} 
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="Aceptar" 
          onPress={showAlert} 
        />
      </View>
    </ScrollView>
  );
}

// Zona 3, ESTILOS y CSS (lo bonito)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d3d3d3',
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
