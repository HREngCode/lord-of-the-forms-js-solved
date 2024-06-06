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

  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const phoneInputOneRef = refs[0];
  const phoneInputTwoRef = refs[1];
  const phoneInputThreeRef = refs[2];
  const phoneInputFourRef = refs[3];

  const createOnChangeHandler = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = refs[index + 1];
    const prevRef = refs[index - 1];
    const value = e.target.value;

    const shouldGoToNextRef =
      currentMaxLength === value.length && nextRef?.current;

    const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

    const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
      index === phoneInputIndex ? e.target.value : phoneInput
    );
    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }
    if (shouldGoToPrevRef) {
      prevRef.current?.focus();
    }
    setPhoneInputState(newState);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid = firstNameInput.trim().length > 2;
  const isLastNameInputValid = lastNameInput.trim().length > 2;
  const isEmailInputValid =
    emailInput.includes("@") && emailInput.includes(".");
  const isCityInputValid = cityInput.length > 0;

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
          <input
            ref={phoneInputOneRef}
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={phoneInputState[0]}
            onChange={createOnChangeHandler(0)}
          />
          -
          <input
            ref={phoneInputTwoRef}
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={phoneInputState[1]}
            onChange={createOnChangeHandler(1)}
          />
          -
          <input
            ref={phoneInputThreeRef}
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={phoneInputState[2]}
            onChange={createOnChangeHandler(2)}
          />
          -
          <input
            ref={phoneInputFourRef}
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={phoneInputState[3]}
            onChange={createOnChangeHandler(3)}
          />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={false} />

      <input type="submit" value="Submit" />
    </form>
  );
};
