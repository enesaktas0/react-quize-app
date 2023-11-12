import React from "react";
import { useEffect, useReducer } from "react";
import Error from "../components/Error";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Question from "../components/Question";
import StartQuize from "../components/StartQuize";
import "./App.css";
import FinalScreen from "../components/FinalScreen";

const secandPerQuestion = 30;

const initialValues = {
  questions: [],
  status: "loading",
  index: 0,
  point: 0,
  highScore: 0,
  numRestart: 0,
  remaindingTime: null,
  allAnswers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { ...state, status: "ready", questions: action.payload };
    case "createAnswers":
      return { ...state, allAnswers: [...state.allAnswers, -1] };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remaindingTime: state.questions.length * secandPerQuestion,
      };
    case "final":
      return {
        ...state,
        status: "finished",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      state.allAnswers[state.index] = action.payload;
      return {
        ...state,
        allAnswers: state.allAnswers,
        point:
          question.correctOption == action.payload
            ? state.point + question.points
            : state.point,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
      };
    case "prev":
      return {
        ...state,
        index: state.index - 1,
      };
    case "restart":
      return {
        ...initialValues,
        numRestart: state.numRestart + 1,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "time":
      return {
        ...state,
        remaindingTime: state.remaindingTime - 1,
        status: state.remaindingTime == 0 ? "finished" : state.status,
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    default:
      throw new Error("Unknown Action");
  }
};

function App() {
  const [
    {
      questions,
      status,
      index,
      allAnswers,
      point,
      highScore,
      numRestart,
      remaindingTime,
    },
    dispatch,
  ] = useReducer(reducer, initialValues);

  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  const numQuestion = questions.length;

  const answer = allAnswers[index];

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3000/questions", {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: "fetch", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    };
    fetchQuestions();
    return function () {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    questions.forEach((question) => {
      dispatch({ type: "createAnswers" });
    });
  }, [questions, numRestart]);

  return (
    <div className="App">
      <Header />
      <article>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuize dispatch={dispatch} numQuestion={numQuestion} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            index={index}
            numQuestion={numQuestion}
            dispatch={dispatch}
            answer={answer}
            point={point}
            totalPoints={totalPoints}
            remaindingTime={remaindingTime}
          />
        )}
        {status === "finished" && (
          <FinalScreen
            totalPoints={totalPoints}
            points={point}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </article>
    </div>
  );
}

export default App;
