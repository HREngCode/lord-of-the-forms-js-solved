import { Component } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { ClassForm } from "./ClassForm";

// const defaultUser = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };

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
    const { allCities } = this.props;
    const { userData } = this.state;

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} />
        <ClassForm allCities={allCities} onFormSubmit={this.handleFormSubmit} />
      </>
    );
  }
}
