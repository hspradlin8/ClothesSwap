import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";


class MyClosetAddForm extends Component {


    //set the initial state
    state = {
        userId: sessionStorage.getItem("credentials"),
        itemName: "",
        quality:[],
        color: [],
        type: [],
        size: "",
        description: "",
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addItem = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.itemName === "" || this.state.quality === "" || this.state.color === "" || this.state.description === "" || this.state.size === "") {
            window.alert("Please input an Item");
        } else {
            this.setState({ loadingStatus: true });
            const addedItem = {
                userId: this.state.userId,
                name: this.state.itemName,
                quality: this.state.qualityId,
                type: this.state.typeId,
                color: this.state.colorId,
                size: this.state.size,
                description: this.state.description,
                clothingType: this.state.typeId,

            };

            APIManager.post("items", addedItem)
                .then(() => { this.props.getData() }
                );

        };
    
    }
// drop down section
    componentDidMount() {
        APIManager.getAll("quality")
        .then((response) => {
            this.setState({
                quality: response
            })
        });
        APIManager.getAll("colors")
        .then((response) => {
            // console.log(response)
            this.setState({
                color: response
            })
        });
        APIManager.getAll("type")
        .then((response) => {
            this.setState({
                type: response
            })
        })
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
                {/* drop down section */}
                <form>
                <label>Quality</label>
                <Input type="select" id="qualityId" onChange={this.handleFieldChange}>
                    { 
                        this.state.quality.map(qual =>  
                    <option key={qual.id} value={qual.id}>{qual.name}</option>
                    )

                    }
                </Input>
                <label>Colors</label>
                <Input type="select" id="colorId" onChange={this.handleFieldChange}>
                    { 
                        this.state.color.map(col =>  
                    <option key={col.id} value={col.id}>{col.name}</option>
                    )

                    }
                </Input>
                <label>Type</label>
                <Input type="select" id="typeId" onChange={this.handleFieldChange}>
                    { 
                        this.state.type.map(ty =>  
                    <option key={ty.id} value={ty.id}>{ty.name}</option>
                    )

                    }
                </Input>
                </form>
                {/* drop down section ends */}
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
                                    <label htmlFor="clothingType">Type:</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={this.handleFieldChange}
                                        id="clothingType"
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