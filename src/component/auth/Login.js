import React, { Component } from "react"
import APIManager from "../modules/APIManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from "react-router-dom";


class Login extends Component {

    // Set initial state

    state = {
        email: "",
        password: "",
        id: "",
    }


    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // 
    handleLogin = (e) => {
        e.preventDefault()
        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        APIManager.getAll("users").then((users) => {
            let singleUser = users.find(
                user =>
                    user.password.toLowerCase() === this.state.password.toLowerCase() &&
                    user.email.toLowerCase() === this.state.email.toLowerCase()
            );
            if (this.state.email === "") {
                window.alert("Please enter email")
            } else if (this.state.password === "") {
                window.alert("Please enter password")
            } else if (this.state.name === "") {
                window.alert("Please enter your name")
            } else if (singleUser) {
                sessionStorage.setItem("userId", singleUser.id);
                sessionStorage.setItem("email", this.state.email);
                sessionStorage.setItem("name", this.state.name);
                this.props.history.push("/");
            } else {
                window.alert("Credentials do not match")
            }

        })
    }
        

    render() {
        return (
            <>
            <div className="logRegForm">
                <h3 className="logRegTitle">Login</h3>
            <Form onSubmit={this.handleLogin} inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label htmlFor="inputEmail" className="mr-sm-2">Email:</Label>
                        <Input onChange={this.handleFieldChange}
                            required="" autoFocus="" type="email" name="email" id="email"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label htmlFor="inputPassword" className="mr-sm-2">Password:</Label>
                        <Input onChange={this.handleFieldChange} type="password"
                            required="" type="password" name="password" id="password" />
                    </FormGroup>
                    <Button className="submit">Submit</Button>
                </Form>
                </div>
                </>
                );
    }
}
export default withRouter(Login);