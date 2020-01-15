import React from "react";

//session component panel buttons
const SessionController = props => {
  return (
    <div className="container-controller">
      <h3 id="session-label">
        Session <br /> Length
      </h3>
      <div className="container-button">
        <i
          id="session-increment"
          onClick={props.onIncrease}
          className="fa fa-sort-up fa-2x"
        />
        <div id="session-length">{props.value}</div>

        <i
          id="session-decrement"
          onClick={props.onDecrease}
          className="fa fa-sort-down fa-2x"
        />
      </div>
    </div>
  );
};

export default SessionController;
