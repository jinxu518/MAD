import { Text, View, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { updateCourse, getCourses } from "../NetWork";
import Context from "../Context";
export default function EditCourse({ navigation, route }) {
    const { state, setState } = useContext(Context);
    const { _id, faculty, title, code } = route.params;
    const [course, setCourse] = useState({
        faculty: faculty || '', // Default to an empty string if null
        title: title || '',     // Default to an empty string if null
        code: code || '',       // Default to an empty string if null
    });
    console.log(route);
    const edit = async () => {
        try {
            const res = await updateCourse(_id,course);
            if (res) {
                alert("Editting successfully")
                const coursesData = await getCourses();
                setState({ ...state, courses: coursesData });
                navigation.goBack();
            } else {
                alert(
                    "Cannot edit the course"
                );
            }
        } catch (error) {
            alert(
                "Cannot edit the course"
            );
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add New Course</Text>
            <TextInput value={course.title} placeholder="title" onChangeText={(text) => setCourse({ ...course, title: text })} style={styles.input} />
            <TextInput value={course.code} placeholder="code" onChangeText={(text) => setCourse({ ...course, code: text })} style={styles.input} />
            <TextInput value={course.faculty} placeholder="faculty" onChangeText={(text) => setCourse({ ...course, faculty: text })} style={styles.input} />
            <TouchableHighlight style={styles.button} onPress={edit}>
                <Text style={styles.text}>Submit</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        width: "80%",
        borderWidth: 1,
        margin: 10,
        fontSize: 30
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
    text: {
        color: '#0066CC',
        fontSize: 50,
        textAlign: 'center',
    },
});


