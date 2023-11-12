import React from "react";

export default function NextButton({ dispatch, answer, index, numQuestion }) {
  if (answer == -1) return;

  if (index + 1 != numQuestion) {
    return (
      <p className="btn-next" onClick={() => dispatch({ type: "next" })}>
        Next
      </p>
    );
  } else {
    return (
      <p className="btn-next" onClick={() => dispatch({ type: "final" })}>
        Finish
      </p>
    );
  }
}
