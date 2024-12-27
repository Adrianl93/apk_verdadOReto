import React, { useState, useRef } from 'react';
import { View, Text, Button, Modal, StyleSheet, Animated, Easing } from 'react-native';
import ruleta from '../../../../assets/images/ruleta.png';
import challengesData from './challenges.json';

const TruthOrDareGame = ({ route, navigation }) => {
  const { players, category } = route.params; // category se pasa desde la pantalla anterior
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [optionType, setOptionType] = useState(''); // "verdad" o "reto"
  const [showScoreMessage, setShowScoreMessage] = useState(false); // Para mostrar el aviso del puntaje
  const [scoreMessage, setScoreMessage] = useState(''); // Mensaje del puntaje
  const spinValue = useRef(new Animated.Value(0)).current;
  const [totalDegrees, setTotalDegrees] = useState(0);

  // Opciones de la ruleta con el orden correcto
  const wheelOptions = [
    'Reto Muy Fácil', 'Verdad Difícil', 'Reto Fácil', 'Verdad Intermedio',
    'Reto Intermedio', 'Verdad Fácil', 'Reto Difícil', 'Verdad Muy Fácil',
  ];

  // Mapeo de las dificultades para evitar el problema de los espacios
  const difficultyMap = {
    'muy fácil': 'muyFácil',
    'fácil': 'fácil',
    'intermedio': 'intermedio',
    'difícil': 'difícil',
    'muy difícil': 'muyDifícil',
  };

  const handleSpin = () => {
    const minTurns = 5;
    const spinTo = (minTurns * 360) + (Math.random() * 360);
    const totalSpin = totalDegrees + spinTo;
  
    const selectedIndex = Math.floor(((totalSpin % 360) / 45) % 8); // Dividir en 8 sectores
    const result = wheelOptions[selectedIndex]; // Ej: "Reto Muy Fácil"
  
    console.log("Result de la ruleta: ", result);
  
    const [type, ...difficultyWords] = result.toLowerCase().split(' '); // Extraemos las palabras de la dificultad
    const difficulty = difficultyWords.join(' ');
  
    console.log("Tipo: ", type);
    console.log("Dificultad extraída: ", difficulty);
  
    const formattedDifficulty = difficultyMap[difficulty] || difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
    console.log("Dificultad formateada: ", formattedDifficulty);
  
    console.log("Categoría: ", category);
  
    // Verificamos si la categoría, tipo y dificultad existen en challengesData
    if (challengesData[category] && challengesData[category][type] && challengesData[category][type][formattedDifficulty]) {
      const challengeList = challengesData[category.toLowerCase()][type.toLowerCase()][formattedDifficulty];
      
      // Verificamos si challengeList existe y tiene elementos
      if (Array.isArray(challengeList) && challengeList.length > 0) {
        const selectedChallenge = challengeList[Math.floor(Math.random() * challengeList.length)];
        setSelectedOption(`${result}: ${selectedChallenge}`);
        setOptionType(type); // Guardamos el tipo (verdad o reto)
      } else {
        console.log("Error: no se encontraron desafíos en la categoría, tipo o dificultad seleccionada.");
      }
    } else {
      console.log("Error: no se encontró el desafío en la categoría seleccionada.");
    }
  
    // Animar la ruleta
    Animated.timing(spinValue, {
      toValue: totalSpin,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setTotalDegrees(totalSpin);
      setShowModal(true);
    });
  };

  const handleComplete = () => {
    const newScores = [...scores];
    
    if (optionType === 'verdad') {
      newScores[currentPlayerIndex] += 1; // Completar una verdad suma 1 punto
    } else if (optionType === 'reto') {
      newScores[currentPlayerIndex] += 2; // Completar un reto suma 2 puntos
    }
    
    setScores(newScores);
    setScoreMessage(`Puntaje actual: ${newScores[currentPlayerIndex]}`); // Actualizar mensaje de puntaje
    setShowScoreMessage(true); // Mostrar mensaje del puntaje

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      setShowScoreMessage(false);
    }, 1000);

    handleNextTurn();
  };

  const handleFail = () => {
    const newScores = [...scores];
    
    if (optionType === 'verdad') {
      newScores[currentPlayerIndex] -= 2; // Fallar una verdad resta 2 puntos
    } else if (optionType === 'reto') {
      newScores[currentPlayerIndex] -= 3; // Fallar un reto resta 3 puntos
    }

    setScores(newScores);
    setScoreMessage(`Puntaje actual: ${newScores[currentPlayerIndex]}`); // Actualizar mensaje de puntaje
    setShowScoreMessage(true); // Mostrar mensaje del puntaje

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      setShowScoreMessage(false);
    }, 1000);

    handleNextTurn();
  };

  const handleNextTurn = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    setShowModal(false);
  };

  const interpolatedSpin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verdad o Reto</Text>
      <Text style={styles.info}>
        Jugador: {players[currentPlayerIndex].toUpperCase()} | Puntaje: {scores[currentPlayerIndex]}
      </Text>

      <View style={styles.wheelContainer}>
        <Animated.Image
          source={ruleta}
          style={[styles.wheel, { transform: [{ rotate: interpolatedSpin }] }]}
        />
        <View style={styles.pointer} />
      </View>

      <Button title="Girar Ruleta" onPress={handleSpin} />

      <Modal visible={showModal} animationType="slide" transparent>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {/* Nombre del jugador */}
      <Text style={styles.modalTitle}>{(players[currentPlayerIndex]).toUpperCase()}</Text>

      {/* Subtítulo con el tipo de desafío */}
      <Text style={styles.modalSubtitle}>{optionType.charAt(0).toUpperCase() + optionType.slice(1)}</Text>

      {/* Texto del desafío */}
      <Text style={styles.modalOption}>{selectedOption.split(': ')[1]}</Text>

      {/* Botones alineados horizontalmente */}
      <View style={styles.buttonContainer}>
      <View style={[styles.button, styles.buttonComplete]}>
    <Text style={styles.buttonText} onPress={handleComplete}>
      Completado
    </Text>
  </View>
  <View style={[styles.button, styles.buttonFail]}>
    <Text style={styles.buttonText} onPress={handleFail}>
      Fallado
    </Text>
  </View>
      </View>
    </View>
  </View>
</Modal>


      {/* Mensaje de puntaje */}
      {showScoreMessage && (
        <View style={styles.scoreMessageContainer}>
          <Text style={styles.scoreMessage}>{scoreMessage}</Text>
        </View>
      )}

      <Button title="Atrás" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
  },
  wheelContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  pointer: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    top: 10,
    zIndex: 10,
    transform: [{ rotate: '45deg' }],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '40%', // Modal más estrecho
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db', // Color destacado
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreMessageContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    zIndex: 100,
  },
  scoreMessage: {
    color: '#fff',
    fontSize: 18,
  },
  modalSubtitle: {
    fontSize: 20, // Tamaño más grande
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Espaciado uniforme entre botones
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
  marginHorizontal: 5,
  paddingVertical: 8, // Reducir el padding para que sea más compacto
  maxWidth: 120, // Establecer un ancho máximo para los botones
  borderRadius: 5,
  alignItems: 'center',
  },
  buttonComplete: {
    backgroundColor: 'green',
  
  },
  buttonFail: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default TruthOrDareGame;
