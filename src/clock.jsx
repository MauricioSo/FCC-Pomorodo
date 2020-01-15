import React from "react";

//clock
const Session = props => {
  return (
    <div className="display">
      <h2 className="title-display" id={props.idTitle}>
        {" "}
        {props.title}{" "}
      </h2>
      <br />
      <div className="inner-display" id="time-left">
        <h1 className="clock">
          {props.minutes}:{props.seconds}
        </h1>
      </div>
    </div>
  );
};

export default Session;
