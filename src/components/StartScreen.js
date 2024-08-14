import React from "react";

const StartScreen = ({ numQues, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to React quiz</h2>
      <h3>{numQues} question to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
