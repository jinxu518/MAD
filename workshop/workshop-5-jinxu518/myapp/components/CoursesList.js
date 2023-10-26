import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Platform, SafeAreaView, View, FlatList, TouchableHighlight, Text } from 'react-native';
import Course from './Course';
import Header from './Header.ios';
import { TextInput } from 'react-native-paper';
import Context from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCourses } from '../NetWork';

export default function CoursesList({ navigation }) {
    const { state, setState } = useContext(Context);
    const [searchText, setSearchText] = useState("");
    const [courses, setCourses] = useState([]);
    const toAdd = () => {
        navigation.navigate("addNewCourse");
    }

    useEffect(() => {
        setCourses(state.courses);
    }, [state.courses]);

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const coursesData = await getCourses();
                setState({ ...state, courses: coursesData });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCoursesData();
    }, []);

    const changeSearch = text => {
        setSearchText(text);
        if (text !== "") {
            let result = [...state.courses];
            const filteredCourses = result.filter(course => {
                return course.title.toLowerCase().includes(text.toLowerCase());
            });
            setCourses(filteredCourses);
        } else {
            setCourses(state.courses);
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                paddingTop: Platform.OS === 'android' ? 30 : 0,
                paddingBottom: 200
            }}>
            <View>
                <Header />
            </View >
            <TextInput placeholder='Live Search' onChangeText={changeSearch} />
            <TouchableHighlight
                onPress={toAdd}
                style={styles.button}
                underlayColor="#5398DC"
            >
                <Text style={styles.buttonText}>Add New Course</Text>
            </TouchableHighlight>
            <FlatList
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => <Course key={index} data={{ ...item, index }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#F5F5F5',
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
});
