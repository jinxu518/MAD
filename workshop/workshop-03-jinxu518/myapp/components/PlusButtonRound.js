import { View, StyleSheet, Text, Button } from "react-native";

export default function PlusButtonRound({ navigation }) {
  const handleAddContact = () => {
    alert("Hello");
  };
  return (
    <View style={styles.roundButton}>
      <Button title="to Add" onPress={() => navigation.navigate('addcontact')} />
    </View>
  );
}
const styles = StyleSheet.create({
  roundButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignSelf: "center",
    backgroundColor: "#2196f3",
    zIndex: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignltems: "center",
    overflow: "hidden",

  },
  plustext: {
    color: 'white',
    fontSize: 40,
    width: 30
  }
});
