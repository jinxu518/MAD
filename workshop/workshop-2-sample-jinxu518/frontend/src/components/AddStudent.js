import { useContext, useEffect, useState } from "react";
import GlobalContext from "../Context";
import { ACTION_TYPES } from "../reducer";
import axios from "axios";

export default function AddStudent() {
  const [student, setStudent] = useState({ name: "", email: "" });
  const [ID, setID] = useState(new Date().getTime());
  const { dispatch } = useContext(GlobalContext);
  const change = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let interval = setInterval(() => {
      let ID = new Date().getTime();
      setID(ID);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const addNewStudent = async () => {
    try {
      //assume I have school id like this
      const school_id = "65242ed4f712bdc915b9c4ac";
      let obj = { ...student, ID }
      const res = await axios.put(
        `http://localhost:5001/schools/${school_id}/students`,
        obj
      );
      if(res.data && res.data.success){
        dispatch({ type: ACTION_TYPES.ADD_STUDENT, payload: obj });
      }
    } catch (error) {}
  };
  return (
    <div>
      <h3>Add New Student</h3>
      <input
        placeholder="Name"
        value={student.name}
        name={"name"}
        onChange={change}
      />
      <input
        placeholder="Email"
        type="email"
        value={student.email}
        name={"email"}
        onChange={change}
      />
      <button onClick={addNewStudent}>Add</button>
    </div>
  );
}
