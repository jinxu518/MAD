import {useEffect, useReducer, useState} from 'react';
import './App.css';
import GlobalContext from './Context';
import Home from './components/Home';
import Starter from './components/Starter';
import reducer, { ACTION_TYPES } from './reducer';
import axios from 'axios'

function App() {
  const [state, dispatch] = useReducer(reducer, {students: [], name: "", showStudentList: true})
  useEffect(() => {
    //const res = localStorage.getItem("students");
    // if(res){
    //   dispatch({type: ACTION_TYPES.SET_STUDENTS, payload: JSON.parse(res)});
    // }
    async function getData(){
      try {
        const school_id = "65242ed4f712bdc915b9c4ac";
        const res = await axios.get(`http://localhost:5001/schools/${school_id}/students`);
        if(res.data && res.data.data){
          dispatch({type: ACTION_TYPES.SET_STUDENTS, payload: res.data.data});
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [])
  return (
    <div className="App">
      <GlobalContext.Provider value={{state, dispatch}}>
        {state.name.length > 0 ? <Home/>: <Starter/>}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
