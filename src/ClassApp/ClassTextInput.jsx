import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

class ClassTextInput extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.updateStateValue(e.target.value);
  };
  render() {
    const { inputProps, errorMessage, isErrorVisible } = this.props;

    return (
      <>
        <div className="input-wrap">
          <label id={inputProps.id}>{inputProps.name}:</label>
          <input onChange={this.handleChange} {...inputProps} />
        </div>

        <ErrorMessage message={errorMessage} show={isErrorVisible} />
      </>
    );
  }
}

export default ClassTextInput;
