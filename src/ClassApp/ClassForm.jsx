import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

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

    this.phoneInputRefs = [createRef(), createRef(), createRef(), createRef()];
  }

  createOnChangeHandler = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.phoneInputRefs[index + 1];
    const prevRef = this.phoneInputRefs[index - 1];
    const value = e.target.value;

    const shouldGoToNextRef =
      currentMaxLength === value.length && nextRef?.current;

    const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

    const newState = this.state.phoneInputState.map(
      (phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
    );

    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }
    if (shouldGoToPrevRef) {
      prevRef.current?.focus();
    }

    this.setState({ phoneInputState: newState });
  };

  handleInputChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
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
    const { onFormSubmit } = this.props;

    const isFirstNameInputValid = firstNameInput.trim().length > 2;
    const isLastNameInputValid = lastNameInput.trim().length > 2;
    const isEmailInputValid =
      emailInput.includes("@") && emailInput.includes(".");
    const isCityInputValid = cityInput.length > 0;
    const isPhoneInputStateValid =
      phoneInputState[0].length === 2 &&
      phoneInputState[1].length === 2 &&
      phoneInputState[2].length === 2 &&
      phoneInputState[3].length === 1;

    if (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid &&
      isPhoneInputStateValid
    ) {
      const formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInputState.join(""),
      };

      onFormSubmit(formData);
      this.resetForm();
    }
  };

  resetForm = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
      isSubmitted: false,
    });
  };

  render() {
    const { allCities } = this.props;
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
    const isEmailInputValid =
      emailInput.includes("@") && emailInput.includes(".");
    const isCityInputValid = cityInput.length > 0;
    const isPhoneInputStateValid =
      phoneInputState[0].length === 2 &&
      phoneInputState[1].length === 2 &&
      phoneInputState[2].length === 2 &&
      phoneInputState[3].length === 1;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            placeholder="Bilbo"
            onChange={this.handleInputChange("firstNameInput")}
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
            onChange={this.handleInputChange("lastNameInput")}
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
            onChange={this.handleInputChange("emailInput")}
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
            list="cities"
            placeholder="Hobbiton"
            onChange={this.handleInputChange("cityInput")}
            value={cityInput}
          />
          <datalist id="cities">
            {allCities.map((city) => {
              <option key={city} value={city} />;
            })}
          </datalist>
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={!isCityInputValid && isSubmitted}
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              ref={this.phoneInputRefs[0]}
              type="text"
              id="phone-input-1"
              placeholder="55"
              value={phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)}
            />
            -
            <input
              ref={this.phoneInputRefs[1]}
              type="text"
              id="phone-input-2"
              placeholder="55"
              value={phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
            />
            -
            <input
              ref={this.phoneInputRefs[2]}
              type="text"
              id="phone-input-3"
              placeholder="55"
              value={phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
            />
            -
            <input
              ref={this.phoneInputRefs[3]}
              type="text"
              id="phone-input-4"
              maxLength={1}
              placeholder="5"
              value={phoneInputState[3]}
              onChange={this.createOnChangeHandler(3)}
            />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={!isPhoneInputStateValid && isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
