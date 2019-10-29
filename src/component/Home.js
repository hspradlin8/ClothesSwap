import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APImanager from './modules/APIManager'



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
              <h2>Welcome, {this.state.user.name}!</h2>
                <h2>User Email: {this.state.user.email}</h2>
                <h3>Notifications:</h3>
                </>
        ) 
    }
}

export default withRouter(Home);