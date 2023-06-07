import { useEffect, useRef, useState } from "react";

const useOtpFunctionality = () => {
  const [state, setState] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
  });
  const [error, setErorr] = useState(null);
  const inputRef = useRef([]);
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChange = (otp, event) => {
    const transformedInput = event.target.value.replace(/\D/g, "");
    setState({ ...state, [otp]: transformedInput });
  };

  const handleError = (errorMesssage) => {
    setErorr(errorMesssage);
  };
  const handleInputFocus = (event, index) => {
    console.log(event.key);
    if (event.key === "Delete" || event.key === "Backspace") {
      setState({ ...state, [event.target.name]: "" });
    //   based on the business logic
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      if (index < 4) {
        inputRef.current[index + 1].focus();
      }
    } else if (event.key !== "Tab" && /^\d+$/.test(event.target.value)) {
      if (index < 4) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  return {
    state,
    error,
    inputRef,
    onError: handleError,
    onInputChange: handleChange,
    onInputFocus: handleInputFocus,
  };
};
export default useOtpFunctionality;
