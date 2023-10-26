import { View, StyleSheet, Text, FlatList } from "react-native";
import context from "../Context";
import { useContext } from "react";
export default function ContactDataTable() {
  const { contactData } = useContext(context);
  const contacts = [...contactData];

  const renderContactItem = ({ item }) => {
    return (
      <View style={styles.contactItem}>
        <View style={{ width: "50%" }}>
          <Text style={styles.contactName}>{item.name}</Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.contactItem}>
        <View style={{ width: "50%" }}>
          <Text style={[styles.contactName, { fontWeight: "bold" }]}>
            Contact Name
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={[styles.contactPhone, { fontWeight: "bold" }]}>
            Phone Number
          </Text>
        </View>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  contactName: {
    fontSize: 18,

    textAlign: "left",
    marginLeft: 10,
  },
  contactPhone: {
    fontSize: 16,
    textAlign: "left",
  },
});
