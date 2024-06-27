import { Component } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { ClassForm } from "./ClassForm";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  handleFormSubmit = (data) => {
    this.setState({ userData: data });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm
          allCities={this.props.allCities}
          setUserData={this.handleFormSubmit}
        />
      </>
    );
  }
}
