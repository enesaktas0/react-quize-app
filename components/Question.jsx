import React, { useEffect, useState } from "react";
import Progres from "../components/Progres";
import Options from "./Options";
import Time from "../components/Times";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Footer from "./Footer";

export default function Question({
  question,
  index,
  numQuestion,
  dispatch,
  answer,
  point,
  totalPoints,
  remaindingTime,
}) {
  return (
    <div className="question">
      <Progres
        numQuestion={numQuestion}
        index={index}
        point={point}
        totalPoints={totalPoints}
        answer={answer}
      />
      <h3 className="question-text">{question.question}</h3>
      {question.options != undefined && (
        <Options
          answers={question.options}
          correctOption={question.correctOption}
          dispatch={dispatch}
          answer={answer}
        />
      )}
      <Footer>
        <PrevButton index={index} dispatch={dispatch} />
        <Time dispatch={dispatch} remaindingTime={remaindingTime} />
        <NextButton
          dispatch={dispatch}
          answer={answer}
          index={index}
          numQuestion={numQuestion}
        />
      </Footer>
    </div>
  );
}
