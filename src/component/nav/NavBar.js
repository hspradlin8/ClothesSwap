import React from 'react';
import { Component } from 'react'
import { Link } from "react-router-dom"
import './NavBar.css';
import { withRouter } from "react-router-dom";

class NavBar extends Component {
    handleLogout = () => {
        this.props.clearUser();
        this.props.history.push("/login");
    }

    render() {
        return (
            <header>
                <h1 className="titlePage">Sharing is Caring<br />
                </h1>
                <nav>
                <ul className="container">
            <li><Link className="nav-link" to="/home">Home</Link></li>
            <li><Link className="nav-link" to="/myCloset">My Closet</Link></li>
            {!this.props.user && 
            <li><Link className="nav-link" to="/login">Login</Link></li>
            }
              <>
              <li><Link className="nav-link" to="/findNewClothes">Find New Clothes</Link></li>
            <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
              </>
          </ul>
                </nav>
            </header>
        )
    }
}
export default withRouter(NavBar);