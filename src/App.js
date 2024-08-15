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
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";

const SECONDS_PER_QUES = 30;
const initalState = {
  questions: [],
  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaning: null,
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
      return {
        ...state,
        status: "active",
        secondsRemaning: state.questions.length * SECONDS_PER_QUES,
      };
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
    case "timer":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? "finished" : state.status,
      };
    case "reset":
      return { ...initalState, status: "ready", questions: state.questions };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaning,
  } = state;
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
              <Footer>
                <Timer secondsRemaning={secondsRemaning} dispatch={dispatch} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQues={numQues}
                />
              </Footer>
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
