import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

class ClassPhoneInput extends Component {
  constructor(props) {
    super(props);
    this.refsArray = [createRef(), createRef(), createRef(), createRef()];
  }

  createOnChangeHandler = (index) => (e) => {
    const { phoneInputState, setPhoneInputState } = this.props;
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.refsArray[index + 1];
    const prevRef = this.refsArray[index - 1];
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

  render() {
    const { errorMessage, isSubmitted, phoneInputState } = this.props;
    const isPhoneInputStateValid =
      phoneInputState[0].length === 2 &&
      phoneInputState[1].length === 2 &&
      phoneInputState[2].length === 2 &&
      phoneInputState[3].length === 1;

    return (
      <>
        <div className="input-wrap">
          <label htmlFor={"phone"}>Phone:</label>
          <div id="phone-input-wrap">
            <input
              ref={this.refsArray[0]}
              type="text"
              id="phone-input-1"
              maxLength={2}
              placeholder="55"
              value={phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)}
            />
            -
            <input
              ref={this.refsArray[1]}
              type="text"
              id="phone-input-2"
              maxLength={2}
              placeholder="55"
              value={phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
            />
            -
            <input
              ref={this.refsArray[2]}
              type="text"
              id="phone-input-3"
              maxLength={2}
              placeholder="55"
              value={phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
            />
            -
            <input
              ref={this.refsArray[3]}
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
          message={errorMessage}
          show={!isPhoneInputStateValid && isSubmitted}
        />
      </>
    );
  }
}
export default ClassPhoneInput;
