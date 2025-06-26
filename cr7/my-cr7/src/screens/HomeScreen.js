import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { nombre, email } = route.params || {};

  return (
    <ImageBackground 
      source={require('../../assets/cr7.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CR7</Text>
        <Text style={styles.welcome}>¡Bienvenido!</Text>
        
        <View style={styles.info}>
          <Text style={styles.label}>Nombre: {nombre}</Text>
          <Text style={styles.label}>Email: {email}</Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  info: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});