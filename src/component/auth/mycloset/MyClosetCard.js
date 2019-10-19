// import React, { Component } from 'react';
// import EventManager from '../../modules/EventManager'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// class MyClosetCard extends Component {
//     /* delete function  used on delete button*/
//     handleDelete = (id) =>  {
//         MyClosetManager.delete(id)
//         .then(() => this.props.getData());
//       }

//       state = {
//         name: "",
//         quality: "",
//         color: "",
//         type: "",
//         size: "",
//         description: "",
//         loadingStatus: true,
//         modal: false
//     };

//     handleFieldChange = evt => {
//         const stateToChange = {}
//         stateToChange[evt.target.id] = evt.target.value
//         this.setState(stateToChange)
//     }
// /* changed match.params to event.id -- this updating even and setting state -- loadingStatus disables button while loading*/
//     updateExistingEvent = evt => {
//         evt.preventDefault()
//         this.setState({ loadingStatus: true });
//         const editedEvent = {
//             id: this.props.event.id,
//             name: this.state.eventName,
//             date: this.state.date,
//             venue: this.state.venue,
//         };
// /*changed  history.push to getData-- renders state again -- gets all events */
//         MyClosetManager.update(editedEvent)
//             .then(() => this.props.getData())
//     }
//     /* change match.params to event.id */
//     componentDidMount() {
//        MyClosetManager.get(this.props.event.id)
//         .then(event => {
//             this.setState({
//               eventName: event.name,
//               date: event.date,
//               venue: event.venue,
//               loadingStatus: false,
//             });
//         });
//       }
//       toggle = () => {
//         this.setState(prevState => ({
//             modal: !prevState.modal
//         }));
//     }

//     render() {
//         return (
//             <>
//                     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//                         <ModalHeader toggle={this.toggle}>Edit Event</ModalHeader>
//                         <ModalBody>
//                         <form>
//                     <fieldset>
//                         <label htmlFor="eventName">Event: </label>
//                         <div className="formgrid">
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="eventName"
//                                 value={this.state.eventName}
//                             />
//                             <label htmlFor="breed">Date: </label>
//                             <input
//                                 type="date"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="date"
//                                 value={this.state.date}
//                             />
//                             <label htmlFor="venue">Venue: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="venue"
//                                 value={this.state.venue}
//                             />
//                         </div>
//                     </fieldset>
//                 </form>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="info" disabled={this.state.loadingStatus}
//                                 onClick={(evt) => {
//                                     this.updateExistingEvent(evt)
//                                     this.toggle()}}>Save Event</Button>{' '}
//                             <Button color="info" onClick={this.toggle}>Cancel</Button>
//                         </ModalFooter>
//                     </Modal>
//                 <div className="eventCard">
//                     <div className="eventCardContent">
//                         <p><strong>Event: </strong>{this.props.event.name}</p>
//                         <p><strong>Date: </strong>{this.props.event.date}</p>
//                         <p><strong>Venue: </strong>{this.props.event.venue}</p>
//                         <Button color="info" className="eventDeleteBtn" id="deleteBtn" type="button" onClick={() => this.handleDelete(this.props.event.id)}>Delete</Button>
//                         <Button color="info" id="editBtn" onClick={this.toggle} >{this.props.buttonLabel} Edit Event </Button>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default EventCard;