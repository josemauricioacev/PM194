import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  StyleSheet,
  Switch,
  Alert
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [modal, setModal] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);

  const mostrarMensaje = (texto, exito = false) => {
    setMensaje(texto);
    setEsExito(exito);
    setModal(true);
  };

  const registrar = () => {
    if (!nombre.trim() || !email.trim()) {
      mostrarMensaje('Completa todos los campos');
      return;
    }

    if (!acepta) {
      mostrarMensaje('Acepta los términos y condiciones');
      return;
    }

    mostrarMensaje(`Registro exitoso!\n\nNombre: ${nombre}\nEmail: ${email}`, true);
  };

  const cerrarModal = () => {
    setModal(false);
    if (esExito) {
      navigation.navigate('Home', { nombre, email });
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/cr7.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CR7</Text>
        <Text style={styles.subtitle}>Registro</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.switchRow}>
            <Switch
              value={acepta}
              onValueChange={setAcepta}
            />
            <Text style={styles.switchText}>Acepto términos y condiciones</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modal} transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{mensaje}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={cerrarModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FF6B00',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});