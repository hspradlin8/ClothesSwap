import { Route } from "react-router-dom";
import React, { Component } from "react";
import MyClosetList from './mycloset/MyClosetList';
import Login from "./Login";


class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>
                <Route
                exact
                path="/login"
                render={props => {
                    return <Login />;
                }}
            />
            <Route exact path="/myCloset" render={(props) => {
                return <MyClosetList {...props} />
              }} />
            </React.Fragment>
        )
    }   
}    
export default ApplicationViews;