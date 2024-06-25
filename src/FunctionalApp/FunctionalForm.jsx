import { useState } from "react";
import FunctionalTextInput from "./FunctionalTextInput";
import { isCityValid, isEmailValid } from "../utils/validations";
import FunctionalPhoneInput from "./FunctionalPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ onFormSubmit }) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid = firstNameInput.trim().length > 2;
  const isLastNameInputValid = lastNameInput.trim().length > 2;
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);

  const reset = () => {
    setFirstNameInput(" ");
    setLastNameInput("");
    setEmailInput(" ");
    setCityInput(" ");
    setPhoneInputState(["", "", "", ""]);
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
      const formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInputState.join(""),
      };

      onFormSubmit(formData);
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
      <FunctionalTextInput
        inputProps={{
          id: "First Name",
          name: "First Name",
          placeholder: "Bilbo",
          value: firstNameInput,
        }}
        updateStateValue={setFirstNameInput}
        errorMessage={firstNameErrorMessage}
        isErrorVisible={!isFirstNameInputValid && isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextInput
        inputProps={{
          id: "Last Name",
          name: "Last Name",
          placeholder: "Baggins",
          value: lastNameInput,
        }}
        updateStateValue={setLastNameInput}
        errorMessage={lastNameErrorMessage}
        isErrorVisible={!isLastNameInputValid && isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextInput
        inputProps={{
          id: "Email",
          name: "Email",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
        }}
        updateStateValue={setEmailInput}
        errorMessage={emailErrorMessage}
        isErrorVisible={!isEmailInputValid && isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextInput
        inputProps={{
          id: "City",
          name: "City",
          list: "allCities",
          placeholder: "Hobbiton",
          value: cityInput,
        }}
        updateStateValue={setCityInput}
        errorMessage={cityErrorMessage}
        isErrorVisible={!isCityInputValid && isSubmitted}
      />

      <FunctionalPhoneInput
        setPhoneInputState={setPhoneInputState}
        phoneInputState={phoneInputState}
        errorMessage={phoneNumberErrorMessage}
        isSubmitted={isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
