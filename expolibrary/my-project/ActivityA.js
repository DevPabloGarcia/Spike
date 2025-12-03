import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useState } from 'react';

export default function ActivityA() {
  const [counter, setCounter] = useState(0);

  const handleBack = () => {
    Alert.alert('Navegación', 'Botón de atrás presionado');
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  const handleShowAlert = () => {
    Alert.alert(
      '¡Expo funciona!',
      'Este es un mensaje de prueba',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Toolbar tipo Android */}
      <View style={[styles.toolbar, { paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }]}>
        <View style={styles.toolbarContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Expo!</Text>
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Contador: {counter}</Text>

        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleReset}>
          <Text style={styles.buttonText}>Resetear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleShowAlert}>
          <Text style={styles.buttonText}>Mostrar Alerta</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    backgroundColor: '#6200EE',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toolbarContent: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 30,
    color: '#333',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonSecondary: {
    backgroundColor: '#03DAC6',
  },
  buttonSuccess: {
    backgroundColor: '#018786',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
