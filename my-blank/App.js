import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  FlatList,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native-web";

export default function App() {
const [Frutas, setFrutas] = useState([]);
const [Verduras, setVerduras] = useState([]);
const [loading, setLoading] = useState(true);
const API_URL = "http://127.0.0.1:8000/productos/";


useEffect(() => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      setFrutas(data.frutas); // Cambia "Frutas" por "frutas"
      setVerduras(data.verduras); // Cambia "Verduras" por "verduras"
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.nombre}</Text>
  </View>
);

const sections = [
  { title: "Frutas", data: Frutas },
  { title: "Verduras", data: Verduras },
];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Productos (FlatList)</Text>
      <FlatList
        data={Frutas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.title}>Frutas y Verduras (SectionList)</Text>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 18,
  },
});