import React from "react";

//break component panel buttons

const BreakController = props => {
  return (
    <div className="container-controller">
      <h3 id="break-label">
        Break <br /> Length
      </h3>
      <div className="container-button">
        <i
          onClick={props.onIncrease}
          id="break-increment"
          className="fa fa-sort-up fa-2x"
        />
        <div id="break-length"> {props.breakTime}</div>
        <i
          id="break-decrement"
          onClick={props.onDecrease}
          className="fa fa-sort-down fa-2x"
        />
      </div>
    </div>
  );
};

export default BreakController;
