import React from "react";
import waitGif from "../assets/wait.gif"; // Use import statement

function Loading() {
  return (
    <div className="center">
      <img src={waitGif} alt="Loading..." />
    </div>
  );
}

export default Loading;
