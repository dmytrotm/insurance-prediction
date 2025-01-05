import React from "react";
import Options from "./Options";

const Question = ({ currentStep, question, answer, onAnswerChange, onOptionChange }) => {
  return (
    <div style={{ width: "100%" }}>
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

      {question.type === "option" && (
        <Options options={question.options} onOptionClick={onOptionChange} />
      )}
    </div>
  );
};

export default Question;
