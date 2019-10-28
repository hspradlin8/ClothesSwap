import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, ModalBody, ModalFooter, Input } from "reactstrap";


class MyClosetEditForm extends Component {
    //set the initial state
    state = {
        itemName: "",
        quality: [],
        color: [],
        type: [],
        size: "",
        description: "",
        loadingStatus: false,
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
        this.setState({ loadingStatus: false });
        const editedItem = {
            id: parseInt(this.props.itemId),
            itemName: this.state.itemName,
            quality: this.state.qualityId,
            type: this.state.typeId,
            color: this.state.colorId,
            size: this.state.size,
            description: this.state.description
        };
        //console.log(editedItem)
        APIManager.update("items", editedItem)
            .then(() => { this.props.getData() }
            );
    }

    componentDidMount() {
        APIManager.getAll("quality")
            .then((response) => {
                this.setState({
                    quality: response
                })
            })
            .then(APIManager.getAll("type")
                .then((response) => {
                    // console.log(response)
                    this.setState({
                        type: response
                    })
                }))

            .then(APIManager.getAll("color")
                .then((response) => {
                    // console.log(response)
                    this.setState({
                        color: response
                    })
                }))

            .then(APIManager.get("items", this.props.itemId)
                .then(item => {
                        console.log(item);

                        this.setState({
                            itemName: item.itemName,
                            quality: item.quality,
                            color: item.color,
                            size: item.size,
                            type: item.typeId,
                            description: item.description,
                            loadingStatus: false,
                        })
                    }));
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

                                <label htmlFor="quality">Quality</label>
                                <Input
                                    type="select"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="qualityId">
                                    {
                                        this.state.quality.map(qual =>
                                            <option key={qual.id} value={qual.id}>{qual.name}</option>
                                        )

                                    }
                                </Input>
                                <label htmlFor="venue">Color: </label>
                                <Input
                                    type="select"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="colorId">
                                    {
                                        this.state.color.map(col =>
                                            <option key={col.id} value={col.id}>{col.name}</option>
                                        )

                                    }
                                </Input>
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
                                <Input
                                    type="select"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="typeId">
                                    {
                                        this.state.type.map(ty =>
                                            <option key={ty.id} value={ty.id}>{ty.name}</option>
                                        )

                                    }
                                </Input>
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