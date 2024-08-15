import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";

import "./index.css";
import Main from "./components/Main";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";

const initalState = {
  questions: [],
  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return { ...initalState, status: "ready", questions: state.questions };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { questions, status, index, answer, points, highscore } = state;
  const numQues = questions.length;
  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => {
        dispatch({ type: "error", payload: error });
      });
  }, []);
  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQues={numQues} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                numQues={numQues}
                index={index}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQues={numQues}
              />
            </>
          )}
          {status === "finished" && (
            <FinishedScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
