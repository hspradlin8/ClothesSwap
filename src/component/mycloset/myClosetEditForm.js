import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, ModalBody, ModalFooter, Input } from "reactstrap";
import Dropzone from 'react-dropzone';
import request from 'superagent';

const uploadPreset = 'clothesSwap';
const uploadURL = 'https://api.cloudinary.com/v1_1/dwx2mgkne/image/upload';


class MyClosetEditForm extends Component {
    //set the initial state
    state = {
        // userId: 2,
        itemName: "",
        qualityArray: [],
        quality: "",
        colorArray: [],
        color: "",
        typeArray: [],
        type: "",
        size: "",
        description: "",
        uploadURL: null,
        file: null,
        imageUrl: "",
        loadingStatus: false,
        modal: false,
        activeUser: parseInt(sessionStorage.getItem("credentials")),
        pageLoaded: false

    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // react-dropzone to upload images
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    // this uploads the image to cloudinary, and sends a URL to the image back in its place
    handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                // console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageUrl: response.body.secure_url
                });
            }
        });
    }

    updateExistingItem = evt => {
        //console.log("evt", parseInt(this.props.userId))
        evt.preventDefault();
        this.setState({ loadingStatus: false });
        const editedItem = {
            userId: parseInt(this.state.userId),
            id: parseInt(this.props.itemId),
            name: this.state.itemName,
            quality: parseInt(this.state.quality),
            type: parseInt(this.state.type),
            color: parseInt(this.state.color),
            size: this.state.size,
            description: this.state.description,
            imageURL: this.state.imageUrl
        };
        // console.log('edited', editedItem)
        APIManager.update("items", editedItem)
            .then(() => { this.props.getData() }
            );
    }

    componentDidMount() {
        APIManager.getAll("quality")
            .then((response) => {
                this.setState({
                    qualityArray: response
                })
            })
            .then(APIManager.getAll("type")
                .then((response) => {
                    // console.log(response)
                    this.setState({
                        typeArray: response
                    })
                }))

            .then(APIManager.getAll("color")
                .then((response) => {
                    //  console.log(response)
                    this.setState({
                        colorArray: response
                    })
                }))

            .then(APIManager.get("items", this.props.itemId)
                .then(item => {
                    // console.log('item before state', item);
                    // console.log("userId");

                    if (item.color !== NaN && item.quality !== NaN && item.type !== NaN) {
                        this.setState({
                            userId: item.userId,
                            itemName: item.name,
                            quality: parseInt(item.quality),
                            color: item.color,
                            size: item.size,
                            type: item.type,
                            description: item.description,
                            imageUrl: item.imageURL,
                            loadingStatus: false,
                        })

                    } else {
                        alert("Please fill out all sections")
                    }

                    // console.log("userIdkjh", this.state.userId);
                })).then(() => {
                    this.setState({
                        pageLoaded: true
                    })
                    // console.log("userId2", this.state.userId);
                })
    };


    render() {
        // console.log('itemname state', this.state.colorArray)
        return (
            <>
                <ModalBody>
                    <form>
                        <fieldset>
                            <div className="formgrid">
                                <label htmlFor="itemName">Item Name:</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="itemName"
                                    value={this.state.itemName}
                                />

                                <label htmlFor="quality">Quality:</label>
                                {this.state.pageLoaded &&
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
                                {this.state.pageLoaded &&
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
                                <label htmlFor="venue">Size: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="size"
                                    value={this.state.size}
                                />
                                <label htmlFor="type">Type: </label>
                                {this.state.pageLoaded &&
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

                            <div>
                                <div className="FileUpload">
                                    <Dropzone
                                        onDrop={this.onImageDrop.bind(this)}
                                        accept="image/*"
                                        multiple={false}>
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} /> EDIT THE PICTURE:
                                                    {
                                                        <p>Upload Picture</p>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>

                                </div>

                                <div>
                                    {this.state.imageUrl === '' ? null :
                                        <div>
                                            <p>{this.state.name}</p>
                                            <img src={this.state.imageUrl} />
                                        </div>}
                                </div>
                                <div className="alignRight"></div>
                                </div>
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
                                //console.log("button fires");
                            }}
                            className="btn-primary"
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