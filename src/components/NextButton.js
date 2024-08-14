import React from "react";

const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return;
  return (
    <div>
      <button className="btn" onClick={() => dispatch({ type: "newQuestion" })}>
        Next
      </button>
    </div>
  );
};

export default NextButton;
