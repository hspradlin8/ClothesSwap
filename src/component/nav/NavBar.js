import React from 'react';
import { Component } from 'react'
import { Link } from "react-router-dom"

class Navbar extends Component {
    render() {
        return (
            <header>
                <h1 className="titlePage">Sharing is Caring<br />
                </h1>
                <nav>
                    <ul className="navContainer">
                        <>
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/about">About App</Link></li>
                            {/* {(this.props.user) ?  */}
                                <li><Link className="nav-link" to="/">Home</Link></li>
                                <li><Link className="nav-link" to="/logout">Log Out</Link></li>  
                        </>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default Navbar