import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import APImanager from './modules/APIManager';
import NotificationList from "./notifications/NotificationsList";
import "./Home.css";
import APIManager from './modules/APIManager';



class Home extends Component {
    state = {
        user: {},
        userCurrentItems: " ",
        userLoanItems: " ",
        userBorrowItems: " "
    }

    userCurrentItems = () => {
        APImanager.getCountOfItemsInMyCloset("items", this.state.user.id)
            .then((closetItems) => {
                // console.log(closetItems, "closet items");
                this.setState({
                    userCurrentItems: closetItems.length
                })
            })
    }

    userLoanItems = () => {
        APImanager.getCountOfLoanItems(this.state.user.id)
            .then((loanItems) => {
                console.log(loanItems, "loan items")
                this.setState({
                    userLoanItems: loanItems.length
                })
            })
    }

    userBorrowItems = () => {
        APIManager.getCountOfBorrowedItems(this.state.user.id)
            .then((borrowedItems) => {
                console.log(borrowedItems, "borrowed items")
                this.setState({
                    userBorrowItems: borrowedItems.length
                })
            })
    }

    getDashBoardItems = () => {
        this.userCurrentItems();
        this.userLoanItems();
        this.userBorrowItems();
    }

    componentDidMount = () => {
        let userId = sessionStorage.getItem("credentials")
        APImanager.get("users", userId)
            .then((res) => {
                this.setState({
                    user: res
                })
            }).then(() => {
                this.getDashBoardItems();
            })
    }



    render() {
        return (
            <>
                <div className="home">
                    <h2>Welcome, {this.state.user.name}!</h2>
                    <h2>User Email: {this.state.user.email}</h2>
                    <div># of items in closet: {this.state.userCurrentItems}</div>
                    <div># of items loaned out: {this.state.userLoanItems}</div>
                    <div># of items borrowed: {this.state.userBorrowItems}</div>
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