import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const simularCarga = () => {
    setLoading(true);
    setMensaje('');
    setTimeout(() => {
      setLoading(false);
      setMensaje('¡Carga completada con éxito!');
    }, 3000); // Simula 3 segundos de carga
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Práctica con ActivityIndicator</Text>

      {loading ? (
        <>
          <ActivityIndicator size="small" color="#2D9CDB" />
          <Text style={styles.texto}>Cargando...</Text>
        </>
      ) : (
        <>
          <Button title="Iniciar carga" onPress={simularCarga} />
          {mensaje !== '' && <Text style={styles.exito}>{mensaje}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 22, marginBottom: 20 },
  texto: { marginTop: 15, color: 'gray' },
  exito: { marginTop: 20, color: 'green', fontWeight: 'bold' },
});