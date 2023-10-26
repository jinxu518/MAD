import React, { useEffect, useContext } from 'react';
import Student from './Student';
import { getAllData } from '../StudentNetwork';
import MyContext from '../MyContext';

export default function () {
    const [state, setState] = useContext(MyContext);

    useEffect(() => {
        async function fetchDate() {
            try {
                const data = await getAllData();
                console.log(data);
                setState({ ...state, data: data[0].students });
            } catch (error) {
                console.error(error);
            }
        }
        fetchDate();
    }, []);

    console.log(state.data);

    return (
        <div>
            {state.data && state.data.map(s => <Student key={s._id} student={s} />)}
        </div>
    );
}
