import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/schools";

export async function addSchool(school) {
    try {
        let url = '';
        const res = await axios.post(url, school);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function getAllData() {
    try {
        let url = '';
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        return null;
    }
}
export async function addStudent(schoolId, student) {
    const url = `/${schoolId}/students`;
    try {
        const res = await axios.put(url, student);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function deleteStudent(schoolId, studentId) {
    const url = `/${schoolId}/students/` + studentId;
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (error) {
        return null;
    }

}

