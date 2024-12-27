import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

// Define el tipo para los props (si los hubiera)
type TruthOrDareSetupProps = {
  navigation: any; // Cambiar `any` por el tipo correcto si usas un Stack Navigator
};

const TruthOrDareSetup: React.FC<TruthOrDareSetupProps> = ({ navigation }) => {
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleStartGame = () => {
    if (playerNames.length === numPlayers) {
      // Cambiar 'GameOptions' por 'TruthOrDareOptions'
      navigation.navigate('TruthOrDareOptions', { players: playerNames });
    } else {
      alert(`Faltan ${numPlayers - playerNames.length} jugadores`);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración del Juego</Text>

      {/* Paso 1: Ingresar número de jugadores */}
      {players.length === 0 && (
        <View>
          <Text style={styles.label}>Número de jugadores:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setNumPlayers(Number(text))}
            value={numPlayers.toString()}
          />
        </View>
      )}

      {/* Paso 2: Mostrar los campos de nombre para cada jugador */}
      {numPlayers > 0 && (
        <View>
          <Text style={styles.label}>Nombres de los jugadores:</Text>
          {Array.from({ length: numPlayers }).map((_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Jugador ${index + 1}`}
              value={playerNames[index]}
              onChangeText={(text) => {
                const updatedNames = [...playerNames];
                updatedNames[index] = text;
                setPlayerNames(updatedNames);
              }}
            />
          ))}
        </View>
      )}

      {/* Paso 3: Mostrar la lista de jugadores agregados */}
      {playerNames.length > 0 && (
        <FlatList
          data={playerNames}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.playerItem}>
              {index + 1}. {item}
            </Text>
          )}
        />
      )}

      {/* Paso 4: Botón para iniciar el juego */}
      {playerNames.length === numPlayers && (
        <Button title="Iniciar juego" onPress={handleStartGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  playerItem: {
    fontSize: 16,
    padding: 5,
  },
});

export default TruthOrDareSetup;
