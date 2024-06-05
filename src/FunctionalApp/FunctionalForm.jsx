import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "../TextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid = firstNameInput.trim().length > 2;
  const isLastNameInputValid = lastNameInput.trim().length > 2;
  const isEmailInputValid =
    emailInput.includes("@") && emailInput.includes(".");
  const isCityInputValid = cityInput.length > 0;

  const cityRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const reset = () => {
    setFirstNameInput(" ");
    setLastNameInput("");
    setEmailInput(" ");
    setCityInput(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid
    ) {
      reset();
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          ref={firstNameRef}
          placeholder="Bilbo"
          onChange={(e) => {
            e.preventDefault();
            setFirstNameInput(e.target.value);
          }}
          value={firstNameInput}
        />
      </div>

      <ErrorMessage
        message={firstNameErrorMessage}
        show={!isFirstNameInputValid && isSubmitted}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          ref={lastNameRef}
          placeholder="Baggins"
          onChange={(e) => {
            e.preventDefault();
            setLastNameInput(e.target.value);
          }}
          value={lastNameInput}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={!isLastNameInputValid && isSubmitted}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          ref={emailRef}
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={(e) => {
            e.preventDefault();
            setEmailInput(e.target.value);
          }}
          value={emailInput}
        />
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={!isEmailInputValid && isSubmitted}
      />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          ref={cityRef}
          placeholder="Hobbiton"
          onChange={(e) => {
            e.preventDefault();
            setCityInput(e.target.value);
          }}
          value={cityInput}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={!isCityInputValid && isSubmitted}
      />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={false} />

      <input type="submit" value="Submit" />
    </form>
  );
};
