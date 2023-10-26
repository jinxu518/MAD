import React, { useContext } from "react";
import GlobalContext from "../Context";

export default React.memo(function Header() {
  const { state } = useContext(GlobalContext);
  return (
    <h1>
      Welcome {state.name}
    </h1>
  );
});
