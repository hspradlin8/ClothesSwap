import React, { Component } from 'react';
import MyClosetManager from '../../modules/MyClosetManager';


class MyClosetForm extends Component {
    state = {
        name: "",
        quality: "",
        color: "",
        type: "",
        size: "",
        description: "",
        loadingStatus: false,
        url: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create item object, invoke the MyClosetManager post method, and redirect to the full MyClosetlist
    */
    constructNewItem = evt => {
        evt.preventDefault();
        if (this.state.itemName === "" || this.state.quality === "" || this.state.color=== "" || this.state.description=== "" || this.state.size=== "") {
            window.alert("Please input an item");
        } else {
            this.setState({ loadingStatus: true });
            const item = {
                name: this.state.itemName,
                quality: this.state.quality,
                color: this.state.color,
                size: this.state.size,
                description: this.state.description,
                url: this.state.url
            };

            // Create the item and redirect user to MyClosetList
            MyClosetManager.post(item)
                .then(() => this.props.history.push("/items"));
        }
    };

    render() {

        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                        <label htmlFor="itemName">Item name</label>
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
                        <label htmlFor="photo">Photo</label>
                        {/* where the input for URL ends */}
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewItem}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default MyClosetForm