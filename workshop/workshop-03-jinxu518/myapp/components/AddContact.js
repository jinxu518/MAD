import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import context from '../Context';

export default function AddContact({ navigation }) {
  const { addContactToLocalStorage } = useContext(context);
  const [contactInfo, setContactInfo] = useState({
    name: { text: '', errorColor: 'gray', errMsg: '' },
    phone: { text: '', errorColor: 'gray', errMsg: '' },
  });

  const handleInputTextChange = (fieldName, text) => {
    setContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [fieldName]: { ...prevContactInfo[fieldName], text },
    }));
  };

  const handleAddContact = () => {
    if (!contactInfo.name.text) {
      setContactInfo((prevContactInfo) => ({
        ...prevContactInfo,
        name: {
          ...prevContactInfo.name,
          errMsg: 'Name Required',
          errorColor: 'red',
        },
      }));
      return;
    } else {
      setContactInfo((prevContactInfo) => ({
        ...prevContactInfo,
        name: {
          ...prevContactInfo.name,
          errMsg: '',
          errorColor: 'gray',
        },
      }));
    }

    if (!contactInfo.phone.text || !/^\d{10}$/.test(contactInfo.phone.text)) {
      setContactInfo((prevContactInfo) => ({
        ...prevContactInfo,
        phone: {
          ...prevContactInfo.phone,
          errMsg: '10 Digits Phone Number Required',
          errorColor: 'red',
        },
      }));
      return;
    } else {
      setContactInfo((prevContactInfo) => ({
        ...prevContactInfo,
        phone: {
          ...prevContactInfo.phone,
          errMsg: '',
          errorColor: 'gray',
        },
      }));
    }

    addContactToLocalStorage(
      { name: contactInfo.name.text, phone: contactInfo.phone.text },
      navigation
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <TextInput
          style={[styles.input, { width: '100%', borderBottomColor: contactInfo.name.errorColor }]}
          placeholder="Contact Name"
          value={contactInfo.name.text}
          onChangeText={(text) => handleInputTextChange('name', text)}
        />
        <Text style={{ marginBottom: 5, color: contactInfo.name.errorColor }}>{contactInfo.name.errMsg}</Text>
      </View>
      <View style={{ width: '100%' }}>
        <TextInput
          style={[styles.input, { width: '100%', borderBottomColor: contactInfo.phone.errorColor }]}
          placeholder="Phone Number"
          value={contactInfo.phone.text}
          onChangeText={(text) => handleInputTextChange('phone', text)}
        />
        <Text style={{ marginBottom: 5, color: contactInfo.phone.errorColor }}>{contactInfo.phone.errMsg}</Text>
      </View>

      <View style={[styles.buttonContainer, { width: '100%' }]}>
        <View style={{ width: '48%' }}>
          <Button title="Add" onPress={handleAddContact} />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            title="Cancel"
            onPress={() => {
              navigation.navigate('contactlist');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'flex-start',
    marginTop: 25,
    width: '100%',
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
