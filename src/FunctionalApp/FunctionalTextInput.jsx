import { ErrorMessage } from "../ErrorMessage";

const FunctionalTextInput = ({
  inputProps,
  updateStateValue,
  errorMessage,
  isErrorVisible,
}) => {
  return (
    <>
      <div className="input-wrap">
        <label id={inputProps.id}>{inputProps.name}:</label>
        <input
          onChange={(e) => {
            e.preventDefault();
            updateStateValue(e.target.value);
          }}
          {...inputProps}
        />
      </div>

      <ErrorMessage message={errorMessage} show={isErrorVisible} />
    </>
  );
};

export default FunctionalTextInput;
