import React, { Component } from "react";
import APIManager from "../modules/APIManager";
// import OtherClosetEditForm from "./OtherClosetEditForm";
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

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    handleDelete = id => {
        APIManager.delete("items", id)
            .then(() => { this.props.getData() }
            );
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
                 {/* <div className="searchBar"></div> */}
                    <div className="card-content">
                        <h3>
                            Item Name:{this.props.item.itemName}
                            <span className="card-itemTitle"></span>
                        </h3>

                        <p>Item Size:{this.props.item.size}</p>

                        <p>Item Color:{this.props.item.color}</p>

                        <p>Item Quality:{this.props.item.quality}</p>

                        <p>Item Type: {this.props.item.typeId}</p>

                        <p>Item Description: {this.props.item.description}</p>

                        <button
                            type="button" className="delete-item"
                            onClick={() =>
                                this.handleDelete(this.props.item.id)
                            }
                        >
                            Delete
						</button>

                        <button
                            type="button" className="edit-item"
                            onClick={() => {
                                this.toggle();
                            }}
                        >
                            Edit
						</button>

                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.toggle} close={closeBtn}>
                                Edit Item
							</ModalHeader>
                            <ModalBody>
                                {/* <OtherClosetEditForm
                                    {...this.props}
                                    itemId={this.props.item.id}
                                    getData={this.props.getData}
                                    toggle={this.toggle}
                                /> */}
                            </ModalBody>
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