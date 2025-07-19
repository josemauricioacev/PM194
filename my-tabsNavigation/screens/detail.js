import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Detail({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Text style={styles.title}>Detalles Usuario</Text>
        <Text style={styles.subtitle}>Usando Navegacion Stack</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});