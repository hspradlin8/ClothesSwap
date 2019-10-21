import React, { Component } from "react";
import ApplicationViews from "./component/auth/ApplicationViews";
import NavBar from "./component/nav/NavBar";
import Register from "./component/auth/Login";
import Login from "./component/auth/Register";
import About from "./component/auth/About";



class App extends Component {
  state = {
    user: false
  }
  // Check if credentials are in session storage
  //returns true/false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  setUser = (authObj) => {
    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    sessionStorage.clear()

    this.setState({
      user: this.isAuthenticated()
    });

  }
  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.user) ?
          <>
            <NavBar
              user={this.state.user}
              isAuthenticated={this.isAuthenticated}
              clearUser={this.clearUser}
            />
              <ApplicationViews
                    user={this.state.user}
                    isAuthenticated={this.isAuthenticated}
                />
          </>
          : <><div className="logRegContainer">
            <Login setUser={this.setUser} />
            <Register setUser={this.setUser} />
            <About />
          </div>
          </>}
      </React.Fragment>
    );
  }
}

export default App;
