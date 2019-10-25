import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, ModalBody, ModalFooter } from "reactstrap";


class MyClosetEditForm extends Component {
    //set the initial state
    state = {
        itemName: "",
        quality: "",
        color: "",
        type: "",
        size: "",
        description: "",
        loadingStatus: true,
        modal: false,
        activeUser: parseInt(sessionStorage.getItem("credentials"))
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingItem = evt => {
        evt.preventDefault();
        this.setState({ loadingStatus: true });
        const editedItem = {
            id: parseInt(this.props.itemId),
            itemName: this.state.itemName,
            quality: this.state.qualityId,
            color: this.state.colorId,
            size: this.state.size,
            type: this.state.typeId,
            description: this.state.description
        };
        console.log(editedItem)
        APIManager.update("items", editedItem)
            .then(() => { this.props.getData() }
            );
    }


    componentDidMount() {
        return APIManager.get("items", this.props.itemId)
            .then(
                item => {
                    this.setState({
                        itemName: item.name,
                        quality: item.quality,
                        color: item.color,
                        size: item.size,
                        type: item.typeId,
                        description: item.description,
                        loadingStatus: false,
                    });
                });
    };

    render() {
        // console.log(this.state.itemName)
        return (
            <>
                <ModalBody>
                    <form>
                        <fieldset>
                            <div className="formgrid">
                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="itemName"
                                    value={this.state.itemName}
                                />

                                <label htmlFor="quality">Quality: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                 id="quality"
                                value={this.state.quality}
                            />
                            <label htmlFor="venue">Color: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="color"
                                value={this.state.color}
                            />
                            <label htmlFor="venue">Size: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="size"
                                value={this.state.size}
                            />
                               <label htmlFor="venue">Type: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="type"
                                value={this.state.type}
                            />
                            <label htmlFor="venue">Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="description"
                                value={this.state.description}
                            />
                            </div>
                            <div className="alignRight"></div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={evt => {
                            this.updateExistingItem(evt);
                            this.props.toggle();
                        }}
                        className="btn btn-primary"
                    >
                        Submit
					</Button>
                    <Button className="cancel" onClick={this.props.toggle}>
                        Cancel
					</Button>
                </ModalFooter>
            </>
        );
    }
}


export default MyClosetEditForm;