import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./components/SplashScreen";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contacts } from "./contacts";
import context from "./Context";
const Stack = createNativeStackNavigator();
export default function App() {
  const [contactData, setContactData] = useState([]);

  async function getDataFromLocalStorage() {
    const data = JSON.parse(await AsyncStorage.getItem("contactdata"));
    if (data) {
      setContactData([...data]);
    } else {
      const data = contacts;
      await AsyncStorage.setItem("contactdata", JSON.stringify(data));
      setContactData([...data]);
    }
  }
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  const addContactToLocalStorage = async (contact, nav) => {
    console.log(contact);
    const data = [...contactData];
    data.push(contact);
    await AsyncStorage.setItem("contactdata", JSON.stringify(data));
    setContactData([...data]);
    nav.navigate("contactlist");
  };

  const sortAsc = () => {
    const asortedData = contactData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactData([...asortedData]);
  };

  const sortDesc = () => {
    const dsortedData = contactData.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setContactData([...dsortedData]);
  };

  const handleSearchTextChange = (text) => {
    if (text === '') {
      getDataFromLocalStorage();
    }
    else {
      const filteredContactData = [...contactData].filter((contact) => contact.name.toLowerCase().includes(text.toLowerCase()) || contact.phone.includes(text))
      setContactData([...filteredContactData]);
    }
  }
  return (
    <context.Provider
      value={{ contactData, addContactToLocalStorage, sortAsc, sortDesc, handleSearchTextChange }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="contactlist"
            component={ContactList}
            options={{ title: "Contact List", headerShown: true }}
          />
          <Stack.Screen
            name="addcontact"
            component={AddContact}
            options={{ title: "Add New Contact", headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </context.Provider>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
