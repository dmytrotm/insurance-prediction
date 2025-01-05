import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Start from "./pages/Start";
import NotFound from "./pages/NotFound";
import Prediction from "./pages/Prediction";
import QuestionForm from "./pages/QuestionForm";
import ChooseCountry from "./pages/ChooseCountry";
import TitleUpdater from "./components/TitleUpdater";

function App() {
  return (
    <BrowserRouter>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/choose-country" element={<ChooseCountry />} />

        <Route path="/:country/question" element={<QuestionForm />} />

        <Route path="/result" element={<Prediction />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
