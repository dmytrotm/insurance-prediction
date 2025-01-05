import React from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";

const ChooseCountry = () => {
  const navigate = useNavigate();

  const handleCountrySelection = (country) => {
    navigate(`/${country}/question`); // Navigate to the appropriate route
  };

  return (
    <div>
      <h1>Select Your Country</h1>
      <Options
        options={["america", "india"]}
        onOptionClick={handleCountrySelection}
      />
    </div>
  );
};

export default ChooseCountry;
