import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import context from "../Context";
import { useContext } from "react";
export default function ContactListHeader() {

  const { sortAsc, sortDesc, handleSearchTextChange } = useContext(context);
  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 0.25, alignItems: "center", marginTop: 5 }}>
        <Text style={styles.searchtext}>Search it</Text>
      </View>
      <View style={{ flex: 0.35 }}>
        <TextInput style={styles.textbox}
          onChangeText={handleSearchTextChange}
        />
      </View>
      <View style={{ flex: 0.22 }}>
        <Button
          title="A-Z ↓"
          onPress={() => sortAsc()} style={styles.button}
        />
      </View>
      <View style={{ flex: 0.22, marginRight: 10 }}>
        <Button
          title="Z-A ↓"
          onPress={() => sortDesc()}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  searchtext: {
    marginTop: 3,
    marginLeft: 20,
    fontSize: 18
  },
  button: {
    marginRight: 5,
  },
  textbox: {
    padding: 7,
    borderWidth: 1,
    borderBlockColor: "gray",
    marginLeft: 5,
    marginRight: 5,
  },
});
