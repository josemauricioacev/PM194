//Zona 1, IMPORTACIONES

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

const Texto=() => {
  const [contenido,setContenido]=useState("Hola Mundo, React Native");
  const actualizaTexto=()=>{setContenido("Texto actualizado");}
  return (
    <Text onPress={actualizaTexto}>{contenido}</Text>
  );
}


// Zona 2, MAIN (ejecucuión del programa)
export default function App() {
  return (
    <View style={styles.container}>


      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <Text>Hola Mundo, React Native</Text>
      <Button title="Tlabaja"></Button>
       
      <StatusBar style="auto" />
    </View>
  );
}



//Zona 3 CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
