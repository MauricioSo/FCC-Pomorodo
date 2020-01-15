import React from "react";

//component button to stop and play clock
const ButtonSession = props => {
  return (
    <button className={props.classNameButton} id={props.id}>
      <i className={props.classNameIcon}></i>
    </button>
  );
};

export default ButtonSession;
