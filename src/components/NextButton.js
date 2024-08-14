const NextButton = ({ dispatch, answer, numQues, index }) => {
  console.log(index === numQues - 1);
  if (answer === null) return null;
  if (index < numQues - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numQues - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Submit
      </button>
    );
  }
};

export default NextButton;
