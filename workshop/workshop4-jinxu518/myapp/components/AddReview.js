
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import StarRating from './StarsComponent';
import { useState, useContext } from 'react';
import Context from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddReview = ({ route }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const { state, setState } = useContext(Context);
  const { index } = route.params.data;

  const [submitting, setSubmitting] = useState(false);
  const submitReview = async () => {
    setSubmitting(true);

    const courses = state.courses.slice();
    if (courses[index]?.reviews) {
      courses[index].reviews.push({ name, comment, rating });

      const totalRating = courses[index].reviews.reduce((total, review) => total + review.rating, 0);
      courses[index].rating = totalRating / courses[index].reviews.length;
    } else {
      courses[index].reviews = [{ name, comment, rating }]
      courses[index].rating = rating;
    }
    setState({ ...state, courses });

    try {
      await AsyncStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  }



  return (
    <View style={styles.root}>
      <Text style={styles.addReview}>Add Review</Text>
      <TextInput style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <Text style={styles.rating}>Your Rating</Text>
      <View>
        <StarRating setRating={setRating} />
      </View>
      <TextInput
        placeholder="Review"
        onChangeText={(text) => setComment(text)}
        value={comment}
        style={styles.input}
        multiline numberOfLines={4}
      ></TextInput>
      {submitting && <ActivityIndicator size="large" />}
      <Button style={styles.submitButtonText} title="Submit" onPress={submitReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 10,
  },
  addReview: {
    fontSize: 25,
    color: '#444',
    textAlign: 'center',
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
  rating: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default AddReview;
