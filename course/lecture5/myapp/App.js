import { useState } from 'react';
import { StyleSheet, Text, View, Alert,Button } from 'react-native';

export default function App() {
  const [state, setState] = useState(0);
  const pressed = () => {
    setState(state + 1)
    // Alert.alert("hello")
  }
  const clear = () => {
    setState(0)
  }
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>{state}</Text>
      <Button title="Click me" onPress={pressed}></Button>
      <Button title="clear" onPress={clear}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
