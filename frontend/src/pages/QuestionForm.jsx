import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Question from "../components/Question"; // Import the Question component

const QuestionForm = ({ questions }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Track if "Next" should be disabled

  const currentQuestion = questions[currentStep];

  const handleInputChange = (value) => {
    setAnswers({
      ...answers,
      [currentStep]: value,
    });

    if (currentQuestion.type === "number") {
      const numericValue = parseInt(value, 10);

      // If the current question is about weight, validate it with BMI
      if (currentQuestion.key === "weight" && answers[1]) {
        // Assuming "height" is question 1
        const height = parseInt(answers[1], 10);
        if (height) {
          const bmi = calculateBMI(height, numericValue);
          if (bmi < 10 || bmi > 50) {
            setWarning("BMI should be between 10 and 50. Adjust the weight.");
            setIsNextDisabled(true);
            return;
          }
        }
      }

      // Standard numeric validation
      if (isNaN(numericValue)) {
        setWarning("Value should be a valid number.");
        setIsNextDisabled(true);
      } else if (
        currentQuestion.min !== undefined &&
        numericValue < currentQuestion.min
      ) {
        setWarning(`Value should be at least ${currentQuestion.min}.`);
        setIsNextDisabled(true);
      } else if (
        currentQuestion.max !== undefined &&
        numericValue > currentQuestion.max
      ) {
        setWarning(
          `Value should be less than or equal to ${currentQuestion.max}.`
        );
        setIsNextDisabled(true);
      } else {
        setWarning("");
        setIsNextDisabled(false);
      }
    } else if (currentQuestion.type === "yesno") {
      setWarning("");
      setIsNextDisabled(false); // No validation needed for yesno questions
    } else {
      setWarning("");
      setIsNextDisabled(false);
    }
  };

  const handleYesNoChange = (value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentStep]: value,
    }));

    if (currentStep === 9 && value === "0") {
      answers[10] = "0";
      submitAnswers();
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsNextDisabled(true); // Reset validation for the next step
    } else {
      submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsNextDisabled(false); // Assume previous step is valid
    }
  };

  const submitAnswers = async () => {
    const data = {
      Age: parseInt(answers[0]),
      Diabetes: parseInt(answers[3]),
      BloodPressureProblems: parseInt(answers[5]),
      AnyTransplants: parseInt(answers[6]),
      AnyChronicDiseases: parseInt(answers[7]),
      KnownAllergies: parseInt(answers[4]),
      HistoryOfCancerInFamily: parseInt(answers[8]),
      NumberOfMajorSurgeries: parseInt(answers[10]),
      BMI: calculateBMI(answers[1], parseInt(answers[2])),
    };

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/result/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const prediction = res.data.prediction;

      if (prediction !== undefined) {
        navigate("/result", { state: { prediction } });
      } else {
        console.error("No prediction returned from the backend");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  // Conditional rendering based on the loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="previous" style={{ height: "2.5rem" }}>
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            style={{ visibility: currentStep > 0 ? "visible" : "hidden" }}
          >
            <i className="arrow arrow-left"></i>
          </button>
        )}
      </div>

      <div className="center">
        <Question
          currentStep={currentStep}
          question={currentQuestion}
          answer={answers[currentStep] || ""}
          onAnswerChange={handleInputChange}
          onYesNoChange={handleYesNoChange}
        />

        <div style={{ height: "1.5rem", marginTop: "0.5rem" }}>
          <p
            style={{
              color: "red",
              fontSize: '1rem',
              visibility: warning ? "visible" : "hidden",
              margin: 0,
            }}
          >
            {warning}
          </p>
        </div>

        {currentQuestion.type === "number" && (
          <button
            onClick={handleNext}
            disabled={isNextDisabled} // Disable button if validation fails
          >
            {currentStep === questions.length - 1 ? "Submit" : "Next"}
          </button>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
