import React, { useRef } from "react";

export default function Options({ answers, correctOption, dispatch, answer }) {
  const hasAnswered = answer != -1;
  const showAnswers = answers.map((option, index) => {
    return (
      <button
        className={`option ${answer == index ? "answer" : ""} ${
          hasAnswered ? (index == correctOption ? "correct" : "wrong") : ""
        }`}
        key={index}
        onClick={() => dispatch({ type: "newAnswer", payload: index })}
        disabled={hasAnswered}
      >
        {option}
      </button>
    );
  });
  return <div className="options">{showAnswers}</div>;
}
