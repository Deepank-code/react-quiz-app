import React from "react";

const Progress = ({ index, numQues, points, maxPoints, answer }) => {
  return (
    <header className="progress">
      <progress max={numQues} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQues}
      </p>
      <p>
        <strong>
          {points}/{maxPoints}
        </strong>
      </p>
    </header>
  );
};

export default Progress;
