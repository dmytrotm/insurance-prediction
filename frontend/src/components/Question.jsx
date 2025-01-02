import React from "react";

const Question = ({ currentStep, question, answer, onAnswerChange, onYesNoChange }) => {
  return (
    <div>
      <h2>Question {currentStep + 1}</h2>
      <p>{question.text}</p>

      {question.type === "number" && (
        <input
          type="number"
          step="1"
          min="0"
          onChange={(e) => onAnswerChange(e.target.value)}
          value={answer || ""}
        />
      )}

      {question.type === "yesno" && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => onYesNoChange("1")} style={{ marginRight: "10px" }}>
            Yes
          </button>
          <button onClick={() => onYesNoChange("0")}>No</button>
        </div>
      )}
    </div>
  );
};

export default Question;
