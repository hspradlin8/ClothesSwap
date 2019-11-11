import React from 'react';
import { Component } from 'react'
import { Link } from "react-router-dom"
import './NavBar.css';
import { withRouter } from "react-router-dom";
import { NavbarBrand } from "react-bootstrap"


class NavBar extends Component {
    handleLogout = () => {
        this.props.clearUser();
        this.props.history.push("/");
    }

    render() {
        return (
            <header>
                <h1 className="titlePage">Sharing is Caring<br />
                <NavbarBrand href="#home"><img
                        src={require("../../component/images/Attachment.png")}
                        className="prodImg"
                        alt="dressform"
                    ></img></NavbarBrand>
                </h1>
                <nav>
                <ul className="container">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/myCloset">My Closet</Link></li>
            {/* {!this.props.user && 
            <li><Link className="nav-link" to="/login">Login</Link></li>
            } */}
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