import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define el tipo para los props (si los hubiera)
type TruthOrDareOptionsScreenProps = {
    navigation: any;
    route: {
      params: {
        players: string[];
      };
    };
  };
  

const TruthOrDareOptions: React.FC<TruthOrDareOptionsScreenProps> = ({ navigation, route }) => {
  const { players } = route.params; // Recibimos los jugadores desde la pantalla anterior

  const handleModeSelection = (mode: string) => {
    // Aquí podemos hacer algo con la selección, como cambiar la dificultad o reglas
    navigation.navigate('Game', { players, mode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el Modo de Juego</Text>

      <Button
        title="Modo Normal"
        onPress={() => handleModeSelection('Normal')}
      />
      <Button
        title="Modo Fiesta"
        onPress={() => handleModeSelection('Fiesta')}
      />
      <Button
        title="Modo Picante"
        onPress={() => handleModeSelection('Picante')}
      />
      <Button
        title="Modo Extremo"
        onPress={() => handleModeSelection('Extremo')}
      />
      <Button
        title="Modo Todos"
        onPress={() => handleModeSelection('Todos')}
      />
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
    marginBottom: 40,
  },
});

export default TruthOrDareOptions;
