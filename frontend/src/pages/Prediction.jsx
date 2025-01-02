import { useLocation } from "react-router-dom";

const Prediction = () => {
  const location = useLocation();
  const { prediction } = location.state || {}; // Get the prediction passed from the previous page

  // Function to round the prediction
  const roundedPrediction = prediction !== null ? Math.round(prediction) : null;

  return (
    <div>
      <h1>Prediction Result 🔮</h1>
      {roundedPrediction !== null ? (
        <p>Your estimeted medical insurance price is {roundedPrediction} ₹</p> // Render the rounded prediction here
      ) : (
        <p>No prediction available.</p>
      )}
    </div>
  );
};

export default Prediction;
