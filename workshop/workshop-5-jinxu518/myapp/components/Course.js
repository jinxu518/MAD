import React, { useState, useContext } from 'react';

import { View, Text, StyleSheet, TouchableHighlight, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Stars from './Stars';
import Context from '../Context';
import { deleteCourse, getCourses } from '../NetWork';

const Course = ({ data }) => {
  const { index, title, faculty, code, rating, _id } = data;
  const navigation = useNavigation();
  const infoPressed = () => {
    navigation.navigate('courseDetails', data);
  };
  const { state, setState } = useContext(Context);
  const toEdit = () => {
    navigation.navigate('editCourse', data);
  };
  const toDeleteCourse = async () => {
    const success = await deleteCourse(_id);
    if (success) {
      console.log("Course deleted successfully");
      const data = await getCourses();
      setState({ ...state, courses: data });
      navigation.navigate('coursesList');
    } else {
      console.log("Course deletion failed");
    }
  };

  const toDelete = () => {
    if (Platform.OS === 'web') {
      const userConfirmed = confirm('Do you want to delete this course?');
      if (userConfirmed) {
        toDeleteCourse();
      }
    } else {
      Alert.alert('Do you want to delete this course?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'OK',
          onPress: () => deleteCourse()
        },
      ]);
    }
  };



  return (
    <View
      style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
      <View style={styles.row}>
        <View style={styles.stars}>
          <Stars rating={rating} />
        </View>

        <View style={styles.course}>
          <Text>{title}</Text>
          <Text style={styles.faculty}>{code} - {faculty}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={infoPressed}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Details</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={toEdit}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={toDelete}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 50,
  },
  stars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    minWidth: 50,
  },
  course: {
    flexDirection: 'column',
    flex: 8,
  },
  faculty: {
    color: 'grey',
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default Course;
