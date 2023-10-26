import { useContext, useState } from "react";
import GlobalContext from "../Context";
import { ACTION_TYPES } from "../reducer";

export default function Starter() {
  const [name, setName] = useState("");
  const { dispatch } = useContext(GlobalContext);
  const change = e => {
    setName(e.target.value);
  };
  const next = () => {
    dispatch({type: ACTION_TYPES.SET_NAME, payload: name });
  };
  return (
    <div>
      <input placeholder="Enter Name" value={name} onChange={change} required />
      <button onClick={next}>Next</button>
    </div>
  );
}
