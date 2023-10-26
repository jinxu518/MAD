export const ACTION_TYPES = {
  ADD_STUDENT: "ADD STUDENT",
  SHOW_LIST: "SHOW LIST",
  SET_NAME: "SET NAME",
  SET_STUDENTS: "SET STUDENTS"
}
export default function reducer(state, action){
  switch(action.type){
    case ACTION_TYPES.ADD_STUDENT:
      const students = [...state.students];
      students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(students))
      return {...state, students};
    case ACTION_TYPES.SHOW_LIST: 
      return {...state, showStudentList: !state.showStudentList};
    case ACTION_TYPES.SET_NAME:
      return {...state, name: action.payload};
    case ACTION_TYPES.SET_STUDENTS:
      return {...state, students: action.payload}
    default: return state;
  }
}