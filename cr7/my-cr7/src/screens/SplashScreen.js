import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Navegar al registro después de 2 segundos
    const timer = setTimeout(() => {
      navigation.replace('Register');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/cr7.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CR7</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>
        <ActivityIndicator size="large" color="#FFD700" style={styles.loading} />
        <Text style={styles.loadingText}>Cargando...</Text>
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
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 50,
  },
  loading: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});