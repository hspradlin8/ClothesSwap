import React, { Component } from "react";
import OtherClosetCard from "../findNewClothes/OtherClosetCard";
import APIManager from "../../modules/APIManager";
import OtherClosetAddForm from "./OtherClosetAddForm"

class OtherClosetList extends Component {
  //define what this component needs to render
  state = {
    items: [],
    modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("userId"))


  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteItem = id => {
    APIManager.delete("items", id).then(() => {
      APIManager.getAll("items").then(newItems => {
        this.setState({
            items: newItems
        });
      });
    });
  };

  getData = () => APIManager.getAll("items", this.activeUserId).then(items => {
    this.setState({
      items: items
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("items", this.activeUserId).then(items => {
      this.setState({
        items: items
      });
    });
  }

  render() {
    return (
      <>
        <div className="items-container">
        <div className="items-intro">
          <h1>Items</h1>
          {/* <img className="events-img" src={require('../../images/addyourevent.png')} alt="logo" /> */}
          </div>
          <OtherClosetAddForm {...this.props}
          getData={this.getData} />
          <div className="item-container-cards">
            {this.state.items.map(item => (
              <OtherClosetCard
                key={item.id}
                item={item}
                deleteItem={this.deleteItem}
                {...this.props}
                getData={this.getData}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default OtherClosetList;