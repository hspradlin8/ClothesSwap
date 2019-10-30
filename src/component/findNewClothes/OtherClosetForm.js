import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, Input, ModalBody } from "reactstrap";


class OtherClosetForm extends Component {

    state = {
        userId: sessionStorage.getItem("credentials"),
        itemName: "",
        qualityArray: [],
        quality: "",
        colorArray: [],
        color: "",
        type: "",
        typeArray: [],
        size: "",
        description: "",
        loadingStatus: true,
        modal: false
    }

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

    // string, user, quality, type, color
    handleSearch = evt => {
        evt.preventDefault();
        APIManager.searchNotMyClothes("items", this.props.currentUser, this.state.quality, this.state.type, this.state.color)
            .then((items => {
                this.props.dropListSearch(items)

            }))

    }


    // drop down section
    componentDidMount() {
        APIManager.getAll("quality")
            .then((response) => {
                this.setState({
                    qualityArray: response
                })
            });
        APIManager.getAll("color")
            .then((response) => {
                // console.log(response)
                this.setState({
                    colorArray: response
                })
            });
        APIManager.getAll("type")
            .then((response) => {
                this.setState({
                    typeArray: response
                })
            })
    }

    render() {
        // console.log('itemname state', this.state.colorArray)
        return (
            <>
                <ModalBody>
                    <form>
                        <fieldset>
                            <div className="formgrid">


                                <label htmlFor="quality">Quality:</label>
                                {
                                    <Input
                                        type="select"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="quality"
                                        value={this.state.quality}>
                                        {this.state.qualityArray.map(qual =>
                                            <option key={qual.id} value={qual.id}>{qual.name}</option>
                                        )

                                        }
                                    </Input>
                                }

                                <label htmlFor="color">Color:</label>
                                {
                                    <Input
                                        type="select"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="color"
                                        value={this.state.color}>
                                        {this.state.colorArray.map(col =>
                                            <option key={col.id} value={col.id}>{col.name}</option>
                                        )

                                        }
                                    </Input>
                                }
                                <label htmlFor="type">Type: </label>
                                {
                                    <Input
                                        type="select"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="type"
                                        value={this.state.type}>
                                        {this.state.typeArray.map(ty =>
                                            <option key={ty.id} value={ty.id}>{ty.name}</option>
                                        )

                                        }
                                    </Input>
                                }

                                {/* {
                                    <Input
                                        className="form-control"
                                        type="search"
                                        id="productType"
                                        placeholder="Search Product"
                                        aria-label="Search"
                                        onChange={this.handleInputdChange}
                                    >
                                    </Input>
                                } */}

                                {<Button
                                    className="button"
                                    required
                                    onClick={this.handleSearch}

                                >
                                    Search
                                 </Button>}
                            </div>
                            <div className="alignRight"></div>
                        </fieldset>
                    </form>
                </ModalBody>
                {/* <ModalFooter> */}
                {/* <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={evt => {
                            this.updateExistingItem(evt);
                            this.props.toggle();
                            console.log("button fires");
                        }}
                        className="btn btn-primary"
                    >
                        Submit
					</Button>
                    <Button className="cancel" onClick={this.props.toggle}>
                        Cancel
					</Button> */}
                {/* </ModalFooter> */}
            </>
        );
    }
}
export default OtherClosetForm;