import { View, StyleSheet, Text } from "react-native";
import ContactListHeader from "./ContactListHeader";
import PlusButtonRound from "./PlusButtonRound";
import ContactDataTable from "./ContactDataTable";

export default function ContactList({ navigation }) {
  return (
    <View style={styles.contactcontainer}>
      <ContactListHeader />
      <ContactDataTable />
      <PlusButtonRound navigation={navigation} />
    </View>
  )
}
const styles = StyleSheet.create({
  contactcontainer: {
    flex: 1,
    width: '100%',
  },
});