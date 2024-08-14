import React from "react";

const Progress = ({ index, numQues }) => {
  return (
    <header className="progress">
      <p>
        Question <strong>{index}</strong>/{numQues}
      </p>
      <p></p>
    </header>
  );
};

export default Progress;
