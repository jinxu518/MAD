import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Stars from './Stars';
// import { useNavigation } from '@react-navigation/native';

const CourseDetails = ({ navigation, route }) => {

  const { _id, title, faculty, code, rating } = route.params;
  // const navigation = useNavigation();
  const data = route.params;
  console.log("detaildata",data);
  const toReview = () => {
    navigation.navigate('addReview', data);
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.stars}>
          <Stars rating={rating} />
        </View>

        <View>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.info}>{code}</Text>
          <Text style={styles.faculty}>{faculty}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={toReview}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoHeader: {
    padding: 20
  },
  info: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
  },
  faculty: {
    color: 'grey',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CourseDetails;
