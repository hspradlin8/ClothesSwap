import React, { Component } from 'react'
//import { Link } from "react-router-dom";

//import the components we will need
import MyClosetCard from './MyClosetCard'
import MyClosetManager from '../../modules/MyClosetManager'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class MyClosetList extends Component {
    //define what this component needs to render
    state = {
        items: [],
        modal: false,
        loadingStatus: false
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewItem = evt => {
        evt.preventDefault();
        if (this.state.itemName === "" || this.state.quality === "" || this.state.color=== "" || this.state.description=== "" || this.state.size=== "" || this.state.userId === "") {
            window.alert("Please input info");
        } else {
            this.setState({ loadingStatus: true });
            const item = {
                name: this.state.itemName,
                quality: this.state.quality,
                color: this.state.color,
                size: this.state.size,
                description: this.state.description,
                userId: this.state.userId
            };

           MyClosetManager.post(item)
                .then(() => this.getData());
        }

    };
    getData = () => {
       MyClosetManager.getAll()
            .then((items) => {
                this.setState({
                    items: items
                })
            })
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentDidMount() {
        this.getData()
    }




    render() {
        return (
            <>
                <div className="itemContainer">
                    <div className="itemFormContainer">
                        <div id="intro"><h3>My Closet Items</h3>
                            {/* <img id="pic" src={require('./events-01.png')} alt="My Dog" /> */}
                        </div>
                        <Button id="modalFormBtn" onClick={this.toggle} >{this.props.buttonLabel} Add New Item </Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Add New Item</ModalHeader>
                            <ModalBody>
                                <form>
                                    <fieldset>
                                        <div className="itemForm">
                                            <label htmlFor="itemName">Name:</label>
                                            <input
                                                type="text"
                                                required
                                                onChange={this.handleFieldChange}
                                                id="itemName"
                                                placeholder="Item Title"
                                            />
                                             <label htmlFor="quality">Quality:</label>
                                            <input
                                                type="text"
                                                required
                                                onChange={this.handleFieldChange}
                                                id="itemQuality"
                                                placeholder="Item Quality"
                                            />
                                             <label htmlFor="itemSize">Size:</label>
                                            <input
                                                type="text"
                                                required
                                                onChange={this.handleFieldChange}
                                                id="itemSize"
                                                placeholder="Item Size"
                                            />
                                            <label htmlFor="color">Color:</label>
                                            <input
                                                type="text"
                                                required
                                                onChange={this.handleFieldChange}
                                                id="itemColor"
                                                placeholder="Item Color"
                                            />
                                            <label htmlFor="itemDescription">Description:</label>
                                            <input
                                                type="text"
                                                required
                                                onChange={this.handleFieldChange}
                                                id="itemDescription"
                                                placeholder="Item Description"
                                            />
                                        </div>
                                    </fieldset>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button id="editBtn"
                                    onClick={(evt) => {
                                        this.constructNewItem(evt)
                                        this.toggle()
                                    }}>Add New Item</Button>{' '}
                                <Button id="deleteBtn" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div className="itemCardContainer">
                        {this.state.items.map(item => <MyClosetCard
                            key={item.id}
                            item={item}
                            getData={this.getData}
                            {...this.props} />)}
                    </div>
                </div>
            </>
        )
    }
}

export default MyClosetList