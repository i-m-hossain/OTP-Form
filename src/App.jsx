import "./App.css";
import useOtpFunctionality from "./hooks/useOtpFunctionality";

function App() {
  const { state, error, onError, inputRef, onInputChange, onInputFocus } =
    useOtpFunctionality();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { otp1, otp2, otp3, otp4, otp5 } = state;
    if (otp1 || otp2 || otp3 || otp4 || otp5) {
      onError("Fill all the fields");
    } else {
      const otp = otp1 + otp2 + otp3 + otp4 + otp5;
      console.log(otp);

      // Dispatch function
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="otpContainer">
          {Array(5)
            .fill("_")
            .map((_, index) => (
              <input
                key={index}
                name={`otp${index + 1}`}
                type="text"
                autoComplete="off"
                className="otpInput"
                value={state[`otp${index + 1}`]}
                onChange={(e) => onInputChange(`otp${index + 1}`, e)}
                tabIndex={index + 1}
                maxLength="1"
                onKeyUp={(e) => onInputFocus(e, index)}
                required
                ref={(el) => (inputRef.current[index] = el)}
              />
            ))}
        </div>
        <p>{error}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
