import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class MyClosetAddForm extends Component {


    //set the initial state
    state = {
        itemName: "",
        quality: "",
        color: "",
        type: "",
        size: "",
        description: "",
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(this.state)
    };

    addItem = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.itemName === ""|| this.state.quality === "" || this.state.color === "" || this.state.description === "" || this.state.size === ""|| this.state.type === "") {
            window.alert("Please input an Item");
        } else {
            this.setState({ loadingStatus: true });
            const addedItem = {
                name: this.state.itemName,
                quality: this.state.quality,
                color: this.state.color,
                size: this.state.size,
                description: this.state.description,
                type: this.state.type,

            };

            APIManager.post("items", addedItem)
                .then(() => { this.props.getData() }
                );
        };
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>
                {" "}
                <Button className="addItem" onClick={this.toggle}>
                    Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Create Item
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="itemName">
                                        Item Name:
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="itemName"
                                        value={this.state.itemName}
                                    />

                                    <label htmlFor="quality">Quality:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="quality"
                                        placeholder="Item Quality"
                                    />
                                    <label htmlFor="itemSize">Size:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="size"
                                        placeholder="Item Size"
                                    />
                                    <label htmlFor="color">Color:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="color"
                                        placeholder="Item Color"
                                    />
                                     <label htmlFor="type">Type:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="type"
                                        placeholder="Item Type"
                                    />
                                    <label htmlFor="itemDescription">Description:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="description"
                                        placeholder="Item Description"
                                    />
                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="add"
                            onClick={this.addItem}
                        >
                            Add
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default MyClosetAddForm;