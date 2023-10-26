import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Platform, SafeAreaView, View, FlatList } from 'react-native';
import Course from './Course';
import Header from './Header.ios';
import { TextInput } from 'react-native-paper';
import Context from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const data = [
    { title: 'Web Application Programming', faculty: 'Asaad Saad', code: 'CS472', rating: 4 },
    { title: 'Modern Web Application', faculty: 'Asaad Saad', code: 'CS572', rating: 5 },
    { title: 'Enterprise Architecture', faculty: 'Joe Bruen', code: 'CS557', rating: 4 },
    { title: 'Algorithms', faculty: 'Clyde Ruby', code: 'CS421', rating: 5 },
    { title: 'Object Oriented JavaScript', faculty: 'Keith Levi', code: 'CS372', rating: 3 },
    { title: 'Big Data', faculty: 'Prem Nair', code: 'CS371', rating: 5 },
    { title: 'Web Application Architecture', faculty: 'Rakesh Shrestha', code: 'CS377', rating: 5 },
    { title: 'Big Data Analytics', faculty: 'Mrudula Mukadam', code: 'CS378', rating: 5 },
];

export default function CoursesList() {
    const { state, setState } = useContext(Context);
    const [searchText, setSearchText] = useState("");
    const [courses, setCourses] = useState(data);
    const changeSearch = text => {
        setSearchText(text);
        if (text !== "") {
            let result = [...state.courses];
            const filteredCourses = result.filter(course => {
                return course.title.toLowerCase().includes(text.toLowerCase());
            });
            setCourses(filteredCourses);
        } else {
            setCourses(data);
        }
    }

    useEffect(() => {
        setState({ ...state, courses: data });
        const setI = async () => {
            try {
                await AsyncStorage.setItem('courses', JSON.stringify(courses));
            } catch (error) {
                console.error("Error saving data to AsyncStorage:", error);
            }
        }
        setI();
    }, [state.courses]);

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
            <FlatList
                data={courses}
                keyExtractor={(item) => item.code}
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
});
