import { useLocation, useNavigate } from "react-router-dom";

const Prediction = () => {

  const navigate = useNavigate();
  
    const goBack = () => {
      navigate("/");
    };
  
  const location = useLocation();
  const { prediction, country } = location.state || {}; 

  // Function to round the prediction
  const roundedPrediction = prediction !== null ? Math.round(prediction) : null;
  let currency_sign = ""

  if (country === "india") {
    currency_sign = "₹";
  } else {
    currency_sign = "$";
  }

  return (
    <div>
      <h1>Let's see what crystal ball has told us 🔮</h1>
      {roundedPrediction !== null ? (
        <p>
          Your estimeted medical insurance price is {currency_sign}{roundedPrediction}
        </p>
      ) : (
        <p>No prediction available.</p>
      )}

      <div className="center">
        <button onClick={goBack}>Go back to the beginning</button>
      </div>
    </div>
  );
};

export default Prediction;
