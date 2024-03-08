import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from './components/Tabs';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer style={styles.container}>
        <StatusBar
          backgroundColor="#f2f2f2"
          barStyle={'dark-content'}
        />
        <Tabs />
      </NavigationContainer>
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
