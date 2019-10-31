import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import OtherClosetForm from "./OtherClosetForm";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";



class OtherClosetCard extends Component {

    state = {
        modal: false,
        otherUserItem: ""
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    handleDelete = id => {
        APIManager.delete("items", id)
            .then(() => { this.props.getData() }
            );
    }
    // step1: know the id of the item-arguement
    // step2: know the id of the person who is logged in- already define as activeUser
    // step3: know the id of the user who owns the item
    // steps 1-3 get with this.props.item
    // step4-create obj with steps 1-3

    createNotificationBtn = () => {
        const newNotification = {
            recieverId: this.props.item.userId,
            userId: this.activeUserId,
            itemId: this.props.item.id,
        }
        APIManager.post("notifications",newNotification)

    }

    componentDidMount() {
        if (this.props.item.userId !== this.props.currentUser) {
            this.setState({ otherUserItem: this.props.item })
        }
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
			</button>
        );
        return (
            <>
                <div className="item-card">

                    <div className="card-content">
                        <h3>
                            Item Name:{this.props.item.name}
                            <span className="card-itemTitle"></span>
                        </h3>

                        <p>Item Size:{this.props.item.size}</p>

                        <p>Item Color:{this.props.item.color}</p>

                        <p>Item Quality:{this.props.item.quality}</p>

                        <p>Item Type: {this.props.item.type}</p>

                        <p>Item Description: {this.props.item.description}</p>

                        <button
                            className="button"
                            required
                            onClick={this.createNotificationBtn}

                        >
                            Notification
                                 </button>
                                 {this.props.item.imageURL === "" ? (
                        <div></div>
                    ) : (
                            <picture>
                                <img src={this.props.item.imageURL} alt={this.props.item.name} />
                            </picture>
                        )}


                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.toggle} close={closeBtn}>

                            </ModalHeader>
                            <ModalBody>
                                <OtherClosetForm
                                    {...this.props}
                                    itemId={this.props.item.id}
                                    getData={this.props.getData}
                                    toggle={this.toggle}
                                />
                            </ModalBody>
                            {/* {<Button
                                    className="button"
                                    required
                                    onClick={this.handleSearch}

                                >
                                    Notification
                                 </Button>} */}
                        </Modal>
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

export default OtherClosetCard;