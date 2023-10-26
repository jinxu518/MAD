import { useContext } from "react"
import GlobalContext from "../Context"
import Student from "./Student";

export default function StudentList(){
  const {state} = useContext(GlobalContext);
  return(
    <div>
      <h1>Student List</h1>
      {
        state.students.map(student => <Student key={student.ID} student={student}/>)
      }
    </div>
  )
}