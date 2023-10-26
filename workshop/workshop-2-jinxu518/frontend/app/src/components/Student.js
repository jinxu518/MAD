import React, { useContext } from 'react';
import { deleteStudent, getAllData } from '../StudentNetwork';
import MyContext from '../MyContext';
export default function Student(props) {
    const { _id, name, email } = props.student;
    const [state, setState] = useContext(MyContext);

    const deleteData = async () => {
        const res = await deleteStudent(state.schoolId, _id);
        if (res) {
            const data = await getAllData();
            setState({ ...state, data: data[0].students })
        }
    }
    return (
        <div>
            <p>{name}-{email}</p>
            <button onClick={deleteData}>Delete</button>
        </div>
    )
}

