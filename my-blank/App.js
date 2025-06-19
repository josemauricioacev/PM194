//Zona 1, IMPORTACIONES

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import React, {useState} from 'react';

const Interruptor=()=>{
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = ()=> setIsEnabled(previousState=>!previousState);

  return(
    <View style={styles.container}>
      <Text>
        {isEnabled ? "Activo" : "Inactivo"}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

// Zona 2, MAIN (ejecucuión del programa)
export default function App() {
  return (
    <View style={styles.container}>
      <Interruptor/>
    </View>
  );
}

//Zona 3, ESTILOS y CSS (lo bonito)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection:'row'
  },
  text: {
    color: 'white', 
    fontsize:27,
  },
  red:{backgroundColor:'red'},
  blue:{backgroundColor:'blue'},
  green:{backgroundColor:'green'},
});