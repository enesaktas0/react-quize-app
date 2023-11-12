import React from "react";
import { useReducer } from "react";

const initialValues = { value: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case "inc":
      return { ...state, value: state.value + state.step };
    case "dec":
      return { ...state, value: state.value - state.step };
    case "setValue":
      return { ...state, value: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "res":
      return initialValues;
    default:
      throw new Error("Unknown Action");
  }
};

export default function DateCounter() {
  const [counter, dispatch] = useReducer(reducer, initialValues);

  const d = new Date();
  const date = d.getFullYear();

  d.setDate(d.getDate() + counter.value);
  return (
    <div className="date-counter">
      <div className="range">
        <input
          type="range"
          max={10}
          value={counter.step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) })
          }
        />
        <p>{counter.step}</p>
      </div>
      <div>
        <button
          onClick={() =>
            counter == 0
              ? dispatch({ type: "dec", payload: 0 })
              : dispatch({ type: "dec", payload: 1 })
          }
        >
          -
        </button>
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: "setValue", payload: Number(e.target.value) })
          }
          value={counter.value}
        />
        <button onClick={() => dispatch({ type: "inc", payload: 1 })}>+</button>
      </div>
      <span>{d.toDateString()}</span>
      <button
        onClick={() => {
          dispatch({ type: "res" });
        }}
      >
        Reset
      </button>
    </div>
  );
}
