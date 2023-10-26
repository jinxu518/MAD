import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import About from './components/About';
import CourseDetails from './components/CourseDetails';
import AddReview from './components/AddReview'
import Context from './Context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CoursesList from './components/CoursesList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddNewCourse from './components/AddNewCourse';
import EditCourse from './components/EditCourse';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function CoursesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="coursesList" component={CoursesList} />
      <Stack.Screen name="courseDetails" component={CourseDetails} />
      <Stack.Screen name="addReview" component={AddReview} />
      <Stack.Screen name="addNewCourse" component={AddNewCourse} />
      <Stack.Screen name="editCourse" component={EditCourse} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [state, setState] = React.useState({ courses: [] });

  // useEffect(() => {
  // const loadData = async () => {

  //   try {
  //     const cachedCourses = await AsyncStorage.getItem('courses');
  //     if (cachedCourses) {
  //       setState({ courses: JSON.parse(cachedCourses) });
  //     }
  //   } catch (error) {
  //     console.error("Error loading data from AsyncStorage:", error);
  //   }
  // };
  // loadData();
  // });


  return (
    <Context.Provider value={{ state, setState }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Courses" component={CoursesStack}
            options={{
              title: "Courses",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} color={color} name='home' />
            }} />
          <Tab.Screen name="About" component={About}
            options={{
              title: "About us",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} color={color} name='account' />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
