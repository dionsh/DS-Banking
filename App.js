import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';


import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" /> 
      {/* Hyrja Kryesore dmth eshte Stack Navigatori*/}
      <StackNavigation />
    </NavigationContainer>
  );
}