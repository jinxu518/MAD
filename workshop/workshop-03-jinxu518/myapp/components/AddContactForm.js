import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

const AddContactForm = ({ onAddContact }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddContact = () => {
        if (name && phone.length === 10) {
            onAddContact(name, phone);
            setName('');
            setPhone('');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                secureTextEntry
            />
            <TextInput
                placeholder="Phone (10 digits)"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="numeric"
            />
            <Button title="Add Contact" onPress={handleAddContact} />
        </View>
    );
};

export default AddContactForm;
