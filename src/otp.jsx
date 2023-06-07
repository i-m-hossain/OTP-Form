import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Fill all the fields");
    } else {
      const enteredOtp = otp.join("");
      console.log(enteredOtp);
      // Perform OTP validation or further processing here
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      if (event.target.value === "") {
        // Move focus to the previous input field on Backspace or Delete key press
        handleInputFocus(index - 1);
      } else {
        // Clear the current input field
        handleChange(index, "");
      }
    }
  };

  const handleInputFocus = (index) => {
    if (index >= 0 && index < inputRefs.current.length) {
      inputRefs.current[index].focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="otpContainer">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleInputFocus(index)}
              maxLength={1}
              required
              ref={(el) => (inputRefs.current[index] = el)}
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
