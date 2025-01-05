const Options = ({ options, onOptionClick }) => {
  return (
    <div className="center">
      {options.map((option, index) => (
        <button
          className="option"
          key={index}
          onClick={() => onOptionClick(option)}
          style={{ margin: "5px", padding: "10px" }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Options;
