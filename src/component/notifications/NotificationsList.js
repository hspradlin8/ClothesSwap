import React, { Component } from "react";
import NotificationsCard from "./NotificationsCard";
import APIManager from "../modules/APIManager";
// import OtherClosetForm from "./OtherClosetForm";


class NotificationList extends Component {
  //define what this component needs to render
  state = {
    notificationList: [],
    types: [],
    modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("credentials"))


  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteNotification = id => {
    APIManager.delete("notifications", id)
      .then(() => {
        this.getNotifications();

      });
  };

  // 
  getNotifications = () => {
    APIManager.getAllMyNotifications(this.activeUserId)
      .then((notificationList) => {
        // console.log(notificationList)
        this.setState({
          notificationList: notificationList
        })
      })
  }



  getItemTypes = () => {
    APIManager.getAll("type")
      .then((types) => {
        this.setState({
          types: types
        })
      })
  }
  componentDidMount() {
    this.getNotifications();
    // this.updateNotifications();
    this.getItemTypes();
  }

  render() {
    return (
      <>
        <div className="items-container">
          <div className="items-intro">
            {/* <img className="events-img" src={require('../../images/addyourevent.png')} alt="logo" /> */}
          </div>
          {/* <OtherClosetForm
            {...this.props}
            // itemId={this.props.item.id}
            getData={this.props.getData}
            toggle={this.toggle}
            dropListSearch={this.dropListSearch}
            currentUser={this.props.currentUser} */}

          {/* /> */}
          <div className="item-container-cards">
            {this.state.notificationList.map(note =>
              <NotificationsCard
                key={note.id}
                note={note}
                deleteNotification={this.deleteNotification}
                {...this.props}
                getNotifications={this.getNotifications}
                types={this.state.types}
                currentUser={this.props.currentUser}

              />

            )}
          </div>
        </div>
      </>
    );
  }



}

export default NotificationList;