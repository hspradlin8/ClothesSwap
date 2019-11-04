import React, { Component } from "react";
import APIManager from "../modules/APIManager";
// import OtherClosetForm from "./OtherClosetForm";
// import { Modal, ModalHeader, ModalBody, } from "reactstrap";



class NotificationCard extends Component {

    state = {
        typeName: "",
    }


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    // handleDelete = id => {
    //     APIManager.delete("items", id)
    //         .then(() => { this.props.getData() }
    //         );
    // }

    // findTypeName = () => {
    //    const typeObj = this.props.types.find((type) =>{
    //     return type.id === parseInt(this.props.note.item.type)
    //     })
    //     console.log(typeObj)
    // }

    getType = () => {
        APIManager.get("type", this.props.note.item.type)
            .then((type) => {
                this.setState({
                    typeName: type.name
                })
            })
    }
    componentDidMount() {
        this.getType();
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
			</button>
        );
        console.log(this.props.note.item.name, "this is a note")
        return (
            <>
                <div className="item-card">

                    <div className="card-content">
                        <h3>
                            User Name:
                            {this.props.note.user.name}
                            <span className="card-itemTitle"></span>
                        </h3>

                        <p>User Email: {this.props.note.user.email}</p>

                        <p>Item Name:
                        {this.props.note.item.name}
                        </p>

                        <p>Item Type:
                        {this.state.typeName}
                        </p>

                       
                        {this.props.note.item.imageURL === "" ? (
                            <div></div>
                        ) : (
                                <picture>
                                    <img src={this.props.note.item.imageURL} alt={this.props.note.item.name} />
                                </picture>
                            )}
                        <button
                            className="button"
                            required
                            onClick={() => this.props.deleteNotification(this.props.note.id)}

                        >
                            Delete Notification
                                 </button>

                    </div>
                    <div className="scroll-img-main">
                        {/* <img className="scroll-img" src={require('../../images/scrollimage.png')} alt="logo" /> */}
                    </div>
                    <hr></hr>
                </div>
            </>
        );
    }
}

export default NotificationCard;