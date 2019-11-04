import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APImanager from './modules/APIManager';
import NotificationList from "./notifications/NotificationsList";
import "./Home.css";



class Home extends Component {
    state = {
        user: {}
    }
    componentDidMount = () => {
        let userId = sessionStorage.getItem("credentials")
        APImanager.get("users", userId)
        .then((res) => this.setState({user: res}))

    }

    render(){
        return(
            <>
            <div className="home">
              <h2>Welcome, {this.state.user.name}!</h2>
                <h2>User Email: {this.state.user.email}</h2>
                <h3>Notifications:</h3>
                </div>
                <div className="noteList">
                <NotificationList
                />
                </div>
                </>
        ) 
    }
}

export default withRouter(Home);