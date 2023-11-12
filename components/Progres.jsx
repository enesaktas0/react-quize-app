import React from "react";

export default function Progres({
  numQuestion,
  index,
  point,
  totalPoints,
  answer,
}) {
  return (
    <div className="progress">
      <progress max={numQuestion} value={index + Number(answer != -1)} />
      <div className="progress-detail">
        <p>
          Question {index + Number(answer != -1)}/{numQuestion}
        </p>
        <p>
          {point}/{totalPoints} Points
        </p>
      </div>
    </div>
  );
}
