import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido a los Juegos!</Text>
      <Text style={styles.instructions}>Elige un juego para comenzar:</Text>
      <Button
        title="Verdad o Reto"
        onPress={() => navigation.navigate('TruthOrDareSetup')} // Nueva pantalla de configuración de juego
      />
      {/* Puedes añadir más botones para otros juegos en el futuro */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 30,
  },
});

export default HomeScreen;
