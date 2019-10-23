import React, { Component } from "react"
import myClosetManager from "../../modules/MyClosetManager";


class MyClosetEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        quality: "",
        color: "",
        type: "",
        size: "",
        description: "",
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingItem = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedItem = {
            name: this.state.itemName,
            quality: this.state.quality,
            color: this.state.color,
            size: this.state.size,
            description: this.state.description
        };

        myClosetManager.update(editedItem)
            .then(() => this.props.history.push("/items"))
    }

    componentDidMount() {
        myClosetManager.get(this.props.match.params.itemId)
            .then(item => {
                this.setState({
                    itemName: item.name,
                    itemQuality: item.quality,
                    itemColor: item.color,
                    itemSize: item.size,
                    itemDescription: item.description,
                    loadingStatus: false,
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="animalName">Item name</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="itemName"
                                value={this.state.itemName}
                            />
                            <label htmlFor="quality">Quality</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="quality"
                                value={this.state.quality}
                            />
                            <label htmlFor="color">Color</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="color"
                                value={this.state.color}
                            />
                            <label htmlFor="size">Size</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="size"
                                value={this.state.size}
                            />
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="description"
                                value={this.state.description}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingItem}
                                className="btn btn-primary"
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}
    export default MyClosetEditForm;