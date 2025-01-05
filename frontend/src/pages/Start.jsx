import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  const Continue = () => {
    navigate("/choose-country");
  };

  return (
    <>
      <h1>Let's calculate your insurance price together!</h1>
      <p>
        We have developed a machine learning model that accurately predicts
        insurance prices. By leveraging cutting-edge algorithms and extensive
        data analysis, our model delivers precise pricing estimates, helping
        businesses streamline their operations and provide tailored solutions to
        clients. This innovative approach ensures competitive pricing while
        minimizing risks, offering both efficiency and reliability.
      </p>
      <button onClick={Continue}>Continue</button>
    </>
  );
}

export default Start;
