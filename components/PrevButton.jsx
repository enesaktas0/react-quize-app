import React from "react";

export default function PrevButton({ index, dispatch }) {
  if (index == 0) return;
  return (
    <p className="btn-prev" onClick={() => dispatch({ type: "prev" })}>
      Previous
    </p>
  );
}
