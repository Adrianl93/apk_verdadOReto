import React, { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Estado para la categoría seleccionada

  const handleModeSelection = (mode: string) => {
    setSelectedCategory(mode); // Guardamos la categoría seleccionada en el estado
    // Navegamos al juego pasando la categoría seleccionada
    navigation.navigate('TruthOrDareGame', { players, category: mode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el Modo de Juego</Text>

      <Button
        title="Modo Normal"
        onPress={() => handleModeSelection('normal')}
      />
      <Button
        title="Modo Fiesta"
        onPress={() => handleModeSelection('fiesta')}
      />
      <Button
        title="Modo Picante"
        onPress={() => handleModeSelection('picante')}
      />
      <Button
        title="Modo Extremo"
        onPress={() => handleModeSelection('extremo')}
      />
      <Button
        title="Modo Todos"
        onPress={() => handleModeSelection('todos')}
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
