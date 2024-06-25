import { Component } from "react";
import ClassTextInput from "./ClassTextInput";
import { isCityValid, isEmailValid } from "../utils/validations";
import ClassPhoneInput from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
      isSubmitted: false,
    };
  }

  resetForm = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInputState,
    } = this.state;

    const isFirstNameInputValid = firstNameInput.trim().length > 2;
    const isLastNameInputValid = lastNameInput.trim().length > 2;
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isCityValid(cityInput);

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

      this.props.onFormSubmit(formData);
      this.resetForm();
      this.setState({ isSubmitted: false });
    }
  };

  updateStateValue = (key) => (value) => {
    this.setState({ [key]: value });
  };

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInputState,
      isSubmitted,
    } = this.state;

    const isFirstNameInputValid = firstNameInput.trim().length > 2;
    const isLastNameInputValid = lastNameInput.trim().length > 2;
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isCityValid(cityInput);

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          inputProps={{
            id: "First Name",
            name: "First Name",
            placeholder: "Bilbo",
            value: firstNameInput,
          }}
          updateStateValue={this.updateStateValue("firstNameInput")}
          errorMessage={firstNameErrorMessage}
          isErrorVisible={!isFirstNameInputValid && isSubmitted}
        />

        {/* last name input */}
        <ClassTextInput
          inputProps={{
            id: "Last Name",
            name: "Last Name",
            placeholder: "Baggins",
            value: lastNameInput,
          }}
          updateStateValue={this.updateStateValue("lastNameInput")}
          errorMessage={lastNameErrorMessage}
          isErrorVisible={!isLastNameInputValid && isSubmitted}
        />

        {/* Email Input */}
        <ClassTextInput
          inputProps={{
            id: "Email",
            name: "Email",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailInput,
          }}
          updateStateValue={this.updateStateValue("emailInput")}
          errorMessage={emailErrorMessage}
          isErrorVisible={!isEmailInputValid && isSubmitted}
        />

        {/* City Input */}
        <ClassTextInput
          inputProps={{
            id: "City",
            name: "City",
            list: "allCities",
            placeholder: "Hobbiton",
            value: cityInput,
          }}
          updateStateValue={this.updateStateValue("cityInput")}
          errorMessage={cityErrorMessage}
          isErrorVisible={!isCityInputValid && isSubmitted}
        />

        <ClassPhoneInput
          setPhoneInputState={(state) =>
            this.setState({ phoneInputState: state })
          }
          phoneInputState={phoneInputState}
          errorMessage={phoneNumberErrorMessage}
          isSubmitted={isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
