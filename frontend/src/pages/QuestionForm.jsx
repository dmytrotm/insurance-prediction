import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Question from "../components/Question";

const QuestionForm = () => {
  const navigate = useNavigate();
  const { country } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    // Fetch questions from backend
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-questions/?country=${country}`
        );
        setQuestions(response.data.questions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setWarning("Could not load questions for the selected country.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [country]);

  // Safely get the current question
  const currentQuestion = questions[currentStep] || {};

  const handleInputChange = (value) => {
    setAnswers({
      ...answers,
      [currentStep]: value,
    });

    if (currentQuestion?.type === "number") {
      const numericValue = parseInt(value, 10);

      // If the current question is about weight, validate it with BMI
      if (currentQuestion.key === "weight" && answers[1]) {
        // Assuming "height" is question 1
        const height = parseInt(answers[1], 10);
        if (height) {
          const bmi = calculateBMI(height, numericValue);
          if (bmi < 15 || bmi > 50) {
            setWarning("BMI should be between 15 and 50. Adjust the weight.");
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
    } else if (currentQuestion?.type === "option") {
      setWarning("");
      setIsNextDisabled(false); // No validation needed for option questions
    } else {
      setWarning("");
      setIsNextDisabled(false);
    }
  };

  const handleOption = (value) => {
    const optionMappings = {
      yes: "1",
      no: "0",
      male: "male",
      female: "female",
      southwest: "southwest",
      southeast: "southeast",
      northwest: "northwest",
      northeast: "northeast",
    };

    const mappedValue = optionMappings[value] || value;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentStep]: mappedValue,
    }));

    if (currentStep === questions.length - 2 && mappedValue === "0") {
      answers[questions.length - 1] = "0";
      submitAnswers();
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsNextDisabled(true);
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
    let data = {};

    if (country === "india") {
      data = {
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
    }

    if (country === "america") {
      data = {
        age: parseInt(answers[0]),
        sex: answers[3],
        bmi: calculateBMI(answers[1], parseInt(answers[2])),
        children: parseInt(answers[7]),
        smoker: answers[4],
        region: answers[5],
      };
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/result/?country=${country}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const prediction = res.data.prediction;

      if (prediction !== undefined) {
        navigate("/result", { state: { prediction, country } });
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
        {currentQuestion?.text && (
          <Question
            currentStep={currentStep}
            question={currentQuestion}
            answer={answers[currentStep] || ""}
            onAnswerChange={handleInputChange}
            onOptionChange={handleOption}
          />
        )}

        <div style={{ height: "1.5rem", marginTop: "0.5rem" }}>
          <p
            style={{
              color: "red",
              fontSize: "1rem",
              visibility: warning ? "visible" : "hidden",
              margin: 0,
            }}
          >
            {warning}
          </p>
        </div>

        {currentQuestion?.type === "number" && (
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
