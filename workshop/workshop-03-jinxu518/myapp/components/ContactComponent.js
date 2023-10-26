import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Contact = ({ name, phone }) => {
    return (
        <View>
            <Text>Name: {name}</Text>
            <Text>Phone: {phone}</Text>
        </View>
    );
};

Contact.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

export default Contact;
