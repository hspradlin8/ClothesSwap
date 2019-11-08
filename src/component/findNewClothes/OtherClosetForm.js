import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, Input, ModalBody, ModalFooter } from "reactstrap";
import Dropzone from 'react-dropzone';
import request from 'superagent';

const uploadPreset = 'clothesSwap';
const uploadURL = 'https://api.cloudinary.com/v1_1/dwx2mgkne/image/upload';

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
        uploadURL: null,
        file: null,
        imageUrl: "",
        loadingStatus: true,
        modal: false
    }

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

      // react-dropzone to upload images
      onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // string, user, quality, type, color
    handleSearch = evt => {
        evt.preventDefault();
        //console.log("button", this.props.currentUser, this.state)
        APIManager.searchNotMyClothes("items", this.props.currentUser, this.state.quality, this.state.type, this.state.color)
            .then((items => {
                this.props.dropListSearch(items)

            }))

    }

      // uploads the image to cloudinary, and sends a URL to the image back in its place
      handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                //  console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageUrl: response.body.secure_url
                });
            }
        });
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
                                                    <input {...getInputProps()} />
                                                    {
                                                        // <p>Upload Pictures</p>
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
                                       <option>Pick a Quality</option>
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
                                     <option>Pick a Color</option>
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
                                    <option>Pick a Type</option>
                                        {this.state.typeArray.map(ty =>
                                            <option key={ty.id} value={ty.id}>{ty.name}</option>
                                        )

                                        }
                                    </Input>
                                }


                                {<Button
                                    className="button"
                                    required
                                    onClick={this.handleSearch}
                        

                                >
                                    Search
                                 </Button>}
                            </div>
                            <div className="alignRight"></div>
                            </div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter>
               
                </ModalFooter>
            </>
        );
    }
}
export default OtherClosetForm;