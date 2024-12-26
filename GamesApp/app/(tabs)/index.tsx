import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TruthOrDareSetup from './screens/truthOrDare/TruthOrDareSetup';
import TruthOrDareOptions from './screens/truthOrDare/TruthOrDareOptions';
import TruthOrDareGame from './screens/truthOrDare/TruthOrDareGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TruthOrDareSetup" component={TruthOrDareSetup} />
        <Stack.Screen name="TruthOrDareOptions" component={TruthOrDareOptions} />
        <Stack.Screen name="TruthOrDareGame" component={TruthOrDareGame} />
      </Stack.Navigator>
  
  );
}
