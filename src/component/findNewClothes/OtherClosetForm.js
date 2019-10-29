import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";


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

    render() {
        return (
            <form>

           
       
                                { <Input
                                    className="form-control"
                                    type="search"
                                    id="productType"
                                    placeholder="Search Product"
                                    aria-label="Search"
                                    onChange={this.handleFieldChange}
                                >
                                </Input> 
                            }
                                
                                { <Button
                                    className="button"
                                    type="submit"
                                    required
                                    onClick={this.search}

                                >
                                    Search
                                 </Button> }
    
                                 <label>Quality</label>
                                 <Input type="select" id="qualityId" onChange={this.handleFieldChange}>
                                     {
                                         this.state.qualityArray.map(qual =>
                                             <option key={qual.id} value={qual.id}>{qual.name}</option>
                                         )

                                     }
                                 </Input>
                                 <label>Colors</label>
                                 <Input type="select" id="colorId" onChange={this.handleFieldChange}>
                                     {
                                         this.state.colorArray.map(col =>
                                             <option key={col.id} value={col.id}>{col.name}</option>
                                         )

                                     }
                                 </Input>
                                 <label>Type</label>
                                 <Input type="select" id="typeId" onChange={this.handleFieldChange}>
                                     {
                                         this.state.typeArray.map(ty =>
                                             <option key={ty.id} value={ty.id}>{ty.name}</option>
                                         )

                                     }
                                 </Input> 
                                 </form>                            ) 
    }
}
