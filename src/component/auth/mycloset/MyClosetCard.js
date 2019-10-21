import React, { Component } from 'react';
import MyClosetManager from '../../modules/MyClosetManager';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class MyClosetCard extends Component {
    /* delete function  used on delete button*/
    handleDelete = (id) =>  {
        MyClosetManager.delete(id)
        .then(() => this.props.getData());
      }

      state = {
        name: "",
        quality: "",
        color: "",
        type: "",
        size: "",
        description: "",
        loadingStatus: true,
        modal: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
/* changed match.params to event.id -- this updating even and setting state -- loadingStatus disables button while loading*/
    updateExistingItem = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedItem = {
            id: this.props.item.id,
            name: this.state.itemName,
            quality: this.state.quality,
            color: this.state.color,
            size: this.state.size,
            description: this.state.description
        };
/*changed  history.push to getData-- renders state again -- gets all events */
        MyClosetManager.update(editedItem)
            .then(() => this.props.getData())
    }
    /* change match.params to event.id */
    componentDidMount() {
       MyClosetManager.get(this.props.item.id)
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
      toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                        <ModalBody>
                        <form>
                    <fieldset>
                        <label htmlFor="itemName">My Closet: </label>
                        <div className="formgrid">
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
                                // type="date"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                // id="date"
                                value={this.state.itemQuality}
                            />
                            <label htmlFor="venue">Color: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="color"
                                value={this.state.itemColor}
                            />
                            <label htmlFor="venue">Size: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="venue"
                                value={this.state.itemSize}
                            />
                            <label htmlFor="venue">Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="description"
                                value={this.state.itemDescription}
                            />
                        </div>
                    </fieldset>
                </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" disabled={this.state.loadingStatus}
                                onClick={(evt) => {
                                    this.updateExistingEvent(evt)
                                    this.toggle()}}>Save Item</Button>{' '}
                            <Button color="info" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                <div className="eventCard">
                    <div className="eventCardContent">
                        <p><strong>My Closet: </strong>{this.props.item.name}</p>
                        <p><strong>Quality: </strong>{this.props.item.quality}</p>
                        <p><strong>Color: </strong>{this.props.item.color}</p>
                        <p><strong>Size: </strong>{this.props.item.size}</p>
                        <p><strong>Description: </strong>{this.props.item.description}</p>
                        <Button color="info" className="itemDeleteBtn" id="deleteBtn" type="button" onClick={() => this.handleDelete(this.props.item.id)}>Delete</Button>
                        <Button color="info" id="editBtn" onClick={this.toggle} >{this.props.buttonLabel} Edit My Closet </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default MyClosetCard;