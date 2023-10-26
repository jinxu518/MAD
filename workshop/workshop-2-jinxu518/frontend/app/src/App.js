import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MyContext from './MyContext';
import ListStudents from './components/ListStudents';
import AddNewStudent from './components/AddNewStudent';
import { getAllData } from './StudentNetwork';
/**
 *`App` component: At the beginning, the app shows a text input letting users
  enter their name with the button "Next". When users click on the button "Next", 
  they will see the following.  
* Header Component: Welcome {fullname} (to be displayed at all times)
* Button: To display either the `ListStudents` component or the 'AddNewStudent`
 component. Only one component will be displayed at a time, and the `ListStudents` 
 component is shown by default.
 */

export default function App() {
    const [state, setState] = useState({ name: '', showAppOrNot: true, showHeaderOrNot: false, showAddOrNot: false, showListOrNot: true, students: [], schoolId: '' });

    const handleNameChange = (e) => {
        setState({ ...state, name: e.target.value });
    };
    useEffect(() => {
        async function fetchData() {
            const data = await getAllData();
            setState({ ...state, schoolId: data[0]._id, students: data[0].students })
        }
        fetchData();
    }, [])
    const clickFunc = () => {
        setState(prevState => ({
            ...prevState,
            showAppOrNot: !prevState.showAppOrNot,
            showHeaderOrNot: !prevState.showHeaderOrNot,
        }));
    };

    return (
        <div>
            <MyContext.Provider value={[state, setState]}>
                <div>
                    {state.showAppOrNot && (
                        <div>
                            <input
                                name="name"
                                placeholder="fullname"
                                value={state.name}
                                onChange={handleNameChange}
                            />
                            <button onClick={clickFunc}>Next</button>
                        </div>)}
                    {
                        state.showHeaderOrNot && <Header />
                    }
                    {!state.showAppOrNot && state.showAddOrNot && <AddNewStudent />}
                    {!state.showAppOrNot && state.showListOrNot && <ListStudents />}
                </div>
            </MyContext.Provider>
        </div>
    );
}