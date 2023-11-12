import React, { useEffect } from "react";

export default function Time({ dispatch, remaindingTime }) {
  let min = Math.floor(remaindingTime / 60);
  let secand = remaindingTime % 60;
  min < 10 ? (min = `0${min}`) : `${min}`;
  secand < 10 ? (secand = `0${secand}`) : `${secand}`;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "time" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <p className="time-value">
      {min}:{secand}
    </p>
  );
}
