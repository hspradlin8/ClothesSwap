import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import MyClosetEditForm from "./myClosetEditForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import { } from 'reactstrap';



class MyClosetCard extends Component {

    state = {
        modal: false
        // dropDownToggle: false
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

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
			</button>
        );

        // const [dropdownOpen, setDropdownOpen] = useState(false);


        return (
            <>
                <div className="item-card">

                    <div className="card-content">
                        <h3>
                            Item Name:{this.props.item.name}
                            {/* <span className="card-itemTitle"></span> */}
                        </h3>

                        <p>Size:{this.props.item.size}</p>

                        <p>Color:{this.props.item.color}</p>

                        <p>Quality:{this.props.item.quality}</p>

                        <p>Type:{this.props.item.type}</p>

                        <p>Description: {this.props.item.description}</p>

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
                                <MyClosetEditForm
                                    {...this.props}
                                    itemId={this.props.item.id}
                                    getData={this.props.getData}
                                    toggle={this.toggle}
                                />
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

export default MyClosetCard;