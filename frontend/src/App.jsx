import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Start from "./pages/Start";
import NotFound from "./pages/NotFound";
import Prediction from "./pages/Prediction";
import QuestionForm from "./pages/QuestionForm";

const questions = [
  { text: "How old are you?", type: "number", min: 18, max: 116 },
  { text: "What is your height (cm)?", type: "number", min: 55, max: 255 },
  { text: "What is your weight (kg)?", type: "number", key: "weight" },
  { text: "Do you have diabetes?", type: "yesno" },
  { text: "Do you have any allergies?", type: "yesno" },
  { text: "Do you have any blood pressure problems?", type: "yesno" },
  { text: "Do you have any major organ transplants?", type: "yesno" },
  { text: "Do you have any chronic diseases?", type: "yesno" },
  {
    text: "Has any of your blood relatives had any form of cancer?",
    type: "yesno",
  },
  {
    text: "Do you have any major surgeries?",
    type: "yesno", // New question to decide whether to ask how many surgeries
  },
  {
    text: "How many major surgeries have you had?",
    type: "number",
    min: 1,
    max: 5,
  }, // Only visible if "Yes" to previous question
];

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Home";
        break;
      case "/question":
        document.title = "Tell us more about yourself";
        break;
      case "/result":
        document.title = "Result";
        break;
      default:
        document.title = "Not Found :(";
    }
  }, [location]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <BrowserRouter>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/question"
          element={<QuestionForm questions={questions} />}
        />
        <Route path="/result" element={<Prediction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
