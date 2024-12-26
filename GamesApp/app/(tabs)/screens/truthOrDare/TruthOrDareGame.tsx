import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define el tipo para los props (si los hubiera)
type TruthOrDareGameProps = {
    route: {
      params: {
        players: string[];
        mode: string;
      };
    };
  };
  

const TruthOrDareGame: React.FC<TruthOrDareGameProps> = ({ route }) => {
  const { players, mode } = route.params; // Recibimos los jugadores y el modo seleccionado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos al juego</Text>
      <Text>Jugadores: {players.join(', ')}</Text>
      <Text>Modo seleccionado: {mode}</Text>

      {/* Aquí puedes adaptar la lógica según el modo */}
      <Button title="Empezar juego" onPress={() => alert(`El juego ha comenzado en modo ${mode}`)} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  

export default TruthOrDareGame;
