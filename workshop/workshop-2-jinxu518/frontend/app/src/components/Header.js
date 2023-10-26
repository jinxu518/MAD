import React, { useState, useContext } from 'react';
import MyContext from '../MyContext';

export default function () {
    const [state, setState] = useContext(MyContext);
    const clickFuc = () => {
        setState({ ...state, showAddOrNot: !state.showAddOrNot, showListOrNot: !state.showListOrNot })
    }
    return (
        <div>
            <p>Welcome:{state.name}</p>
            <button onClick={clickFuc}>{state.showListOrNot ? "AddNewStudent" : "ShowListStudents"}</button>
        </div>
    )
}