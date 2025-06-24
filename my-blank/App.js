import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setAppReady(true);
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require('./assets/cr7.jpg')} // Cambiado a cr7.jpg
      style={styles.background}
      resizeMode="cover" // Asegura que la imagen se ajuste al contenedor
    >
      <View style={styles.container}>
        <Text style={styles.label}>Bienvenido a mi App:</Text>
        <Text style={styles.subtitle}>
          {appReady ? 'Carga completa' : 'Cargando...'}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ocupa todo el espacio disponible
    width: '100%', // Asegura que la imagen ocupe el ancho completo
    height: '100%', // Asegura que la imagen ocupe el alto completo
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(211, 211, 211, 0.8)', // Fondo semitransparente para que la imagen sea visible
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
