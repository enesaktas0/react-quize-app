import React from "react";

export default function StartQuize({ dispatch, numQuestion }) {
  return (
    <div>
      <h2>Welcome to The React Quize!</h2>
      <h3>
        The Quize has {numQuestion} Questions.These Questions will Test Your
        React Mastery!
      </h3>
      <button className="btn-start" onClick={() => dispatch({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}
