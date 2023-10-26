import { useContext } from "react"
import Header from "./Header";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import GlobalContext from "../Context"
import { ACTION_TYPES } from "../reducer";
export default function Home(){
  const {state, dispatch} = useContext(GlobalContext);
  const showStudentList = () => {
    dispatch({type: ACTION_TYPES.SHOW_LIST})
  }
  return(
    <div>
      <Header/>
      <button onClick={showStudentList}>
        {state.showStudentList ? "Add Student" : "Show List"}
      </button>
      {
        state.showStudentList ? <StudentList/> : <AddStudent/>
      }
    </div>
  )
}