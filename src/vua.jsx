import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setErorr] = useState(null);
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChange = (key, event) => {
    const index = parseInt(key.slice(3)) - 1;
    const updatedOtp = [...otp];
    updatedOtp[index] = event.target.value.replace(/(\d+)/);
    setOtp(updatedOtp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isOtpEmpty = otp.some((otpValue) => !otpValue);
    if (isOtpEmpty) {
      setErorr("Fill all the fields");
    } else {
      const otpValue = otp.join("");
      // Do something with the OTP value
    }
  };

  const handleInputFocus = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      inputRef.current[index - 1].focus();
    } else if (event.key !== "Tab" && index < 4) {
      inputRef.current[index + 1].focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="otpContainer">
          {Array.from({ length: 5 }, (_, index) => (
            <input
              key={index}
              name={`otp${index + 1}`}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={otp[index]}
              onChange={(e) => handleChange(`otp${index + 1}`, e)}
              tabIndex={index + 1}
              maxLength="1"
              onKeyUp={(e) => handleInputFocus(e, index)}
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
