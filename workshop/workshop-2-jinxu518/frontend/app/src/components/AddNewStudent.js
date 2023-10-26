import { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";
import { getAllData, addStudent } from "../StudentNetwork";

export default function AddNewStudent() {
    const [state, setState] = useContext(MyContext);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isEmailUnique, setIsEmailUnique] = useState(true);
    const [randomId, setRam] = useState('');

    // Function to generate a random ID
    function generateRandomId() {
        const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
        const random = Math.random().toString(16).substr(2, 10);
        const counter = (Math.floor(Math.random() * 16777215) + 1).toString(16).padStart(6, '0');
        return timestamp + random + counter;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const id = generateRandomId();
            setRam(id);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    // Function to check if email is unique
    async function isEmailUniqueCheck(email) {
        const data = await getAllData();
        let index = data[0].students.findIndex(student => student.email === email);
        return index === -1;
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmailUnique = await isEmailUniqueCheck(formData.email);
        if (isEmailUnique) {
            const newStudent = { id: randomId, name: formData.name, email: formData.email };
            const res = await addStudent(state.schoolId, newStudent);
            if (res && res.success) {
                setState({
                    ...state,
                    showAddOrNot: !state.showAddOrNot,
                    showListOrNot: !state.showListOrNot,
                    students: [...state.students, newStudent]
                });
                localStorage.setItem("students", JSON.stringify([...state.students, newStudent]));
            }
            // Clear form data
            setFormData({ name: "", email: "" });
        } else {
            setIsEmailUnique(false);
        }
    };


    return (
        <div>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Submit</button>
                {!isEmailUnique && <p>Email is not unique!</p>}
            </form>
        </div>
    );
}
