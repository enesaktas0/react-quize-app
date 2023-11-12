import React from "react";

export default function FinalScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const persantage = (points / totalPoints) * 100;
  return (
    <>
      <p className="final">
        You scored {points} out of {totalPoints} points.({persantage.toFixed(0)}{" "}
        %)
      </p>
      <p>High Score : {highScore}</p>

      <button
        className="btn-restart"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}
