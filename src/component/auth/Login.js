import React, { Component } from "react"
import LoginManager from "../modules/LoginManager";
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
        let credentials = { email: this.state.email, password: this.state.password }
        LoginManager.getUserData(this.state.email)
            .then(result => {
                console.log(result)
                if (result.length > 0) {
                    console.log("if triggered")
                    this.props.setUser(result);
                    this.props.history.push("/");
                } else {
                    console.log(credentials)
                    LoginManager.createUser(credentials)
                        .then(result => {
                            console.log("result is", result);
                            this.props.setUser(result);
                        })
                        this.props.history.push("/")
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