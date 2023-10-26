import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, navigation } from 'react-native';
import StarRating from './StarsComponent';
import Context from '../Context';
import { addReview } from '../NetWork'; // 导入 addReview 函数

const AddReview = ({ route }) => {
  const { _id } = route.params;
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const { state, dispatch } = useContext(Context);

  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    setSubmitting(true);

    const newReview = { name, comment, rating };

    const success = await addReview(_id, newReview); // 调用 addReview 函数

    if (success) {
      navigation.goBack();
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.addReview}>Add Review</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
      />
      <Text style={styles.rating}>Your Rating</Text>
      <View>
        <StarRating rating={rating} setRating={setRating} />
      </View>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={(text) => setComment(text)}
        placeholder="Review"
        multiline
        numberOfLines={4}
      />
      {submitting && <ActivityIndicator size="large" />}
      <Button
        style={styles.submitButton}
        title="Submit"
        onPress={submitReview}
      />
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
