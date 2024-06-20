import { useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

const FunctionalPhoneInput = ({
  errorMessage,
  isSubmitted,
  setPhoneInputState,
  phoneInputState,
}) => {
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const phoneInputOneRef = refs[0];
  const phoneInputTwoRef = refs[1];
  const phoneInputThreeRef = refs[2];
  const phoneInputFourRef = refs[3];
  const isPhoneInputStateValid =
    phoneInputState[0].length == 2 &&
    phoneInputState[1].length == 2 &&
    phoneInputState[2].length == 2 &&
    phoneInputState[3].length == 1;

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
  return (
    <>
      <div className="input-wrap">
        <label htmlFor={"phone"}>Phone:</label>
        <div id="phone-input-wrap">
          <input
            ref={phoneInputOneRef}
            type="text"
            id="phone-input-1"
            maxLength={2}
            placeholder="55"
            value={phoneInputState[0]}
            onChange={createOnChangeHandler(0)}
          />
          -
          <input
            ref={phoneInputTwoRef}
            type="text"
            id="phone-input-2"
            maxLength={2}
            placeholder="55"
            value={phoneInputState[1]}
            onChange={createOnChangeHandler(1)}
          />
          -
          <input
            ref={phoneInputThreeRef}
            type="text"
            id="phone-input-3"
            maxLength={2}
            placeholder="55"
            value={phoneInputState[2]}
            onChange={createOnChangeHandler(2)}
          />
          -
          <input
            ref={phoneInputFourRef}
            type="text"
            id="phone-input-4"
            maxLength={1}
            placeholder="5"
            value={phoneInputState[3]}
            onChange={createOnChangeHandler(3)}
          />
        </div>
      </div>

      <ErrorMessage
        message={errorMessage}
        show={!isPhoneInputStateValid && isSubmitted}
      />
    </>
  );
};
export default FunctionalPhoneInput;
