import React, { Component } from "react"
import APIManager from "../modules/APIManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


class Register extends Component {

  // Set initial state
  state = {
    name: "",
    rEmail: "",
    rPassword: "",
  };

  handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleRegister = (e) => {
    e.preventDefault()
    this.toggle()
    APIManager.getAll("users").then((users) => {
      let isMatch = users.find(user => user.email.toLowerCase() === this.state.rEmail.toLowerCase())

      if (this.state.name === "") {
        window.alert("Please enter a name")
      } else if (this.state.email === "") {
        window.alert("Please enter an email address")
      } else if (this.state.password === "") {
        window.alert("Please enter a password")
      } else if (isMatch) {
        window.alert("Email address already exists")
      } else {
        let newUser = {
          name: this.state.name,
          email: this.state.rEmail,
          password: this.state.rPassword,
        };
        APIManager.post("users", newUser)
            .then((createdUser) => {
            sessionStorage.setItem("userId", createdUser.id);
            sessionStorage.setItem("email", this.state.email);
            sessionStorage.setItem("name", this.state.name);


              //This determines which page you land on upon registration
              this.props.history.push("/")
            }
        )}
      }
    )

  }

  render() {
    return (
      <>
        <div className="logRegForm">
          <h3 className="logRegTitle">Register</h3>
          <Form onSubmit={this.handleRegister} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="name" className="mr-sm-2">Name:</Label>
              <Input onChange={this.handleFieldChange} type="name"
                id="name"
                placeholder="Name"
                required="" autoFocus="" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="inputEmail" className="mr-sm-2">Email:</Label>
              <Input onChange={this.handleFieldChange} type="email"
                id="rEmail"
                placeholder="Email address"
                required="" autoFocus="" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label htmlFor="inputPassword" className="mr-sm-2">Password:</Label>
              <Input onChange={this.handleFieldChange} type="password"
                id="rPassword"
                placeholder="Password"
                required="" />
            </FormGroup>
            <Button className="submit">Submit</Button>
          </Form>
        </div>
      </>
    )
  }
}
export default Register;
