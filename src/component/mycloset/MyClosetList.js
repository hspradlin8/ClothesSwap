import React, { Component } from "react";
import MyClosetCard from "./MyClosetCard";
import APIManager from "../modules/APIManager";
import MyClosetAddForm from "./MyClosetAddForm";

class MyClosetList extends Component {
  //define what this component needs to render
  state = {
    items: [],
    quality: [],
    color: [],
    type: [],
    modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("credentials"))


  toggle = () => {
    // console.log("test");
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

  getData = () => {
    let types = []
    let qualitys = []
    let colors = []
    APIManager.getAll("type")
      .then((type) => {
        //  console.log(type)
        types = type
      }).then(() => {

        APIManager.getAll("color")
          .then((color) => {
            // console.log(color)
            colors = color
          }).then(() => {

            APIManager.getAll("quality")
              .then((quality) => {
                // console.log(quality)
                qualitys = quality
              }).then(() => {
                // console.log(this.props.currentUser)

                APIManager.getAllMyClothes("items", parseInt(this.props.currentUser)).then(items => {
                  // console.log("HERE", items, this.props.currentUser)
                  let filteredArray = []
                  items.forEach(e => {
                    if (e.type !== null) {
                      var ty = types.filter(t => t.id === e.type);
                      e.type = ty[0].name;
                    }
                    if (e.color !== null) {
                      var col = colors.filter(c => c.id === e.color);
                      e.color = col[0].name;
                    }
                    if (e.quality !== null) {
                      var qual = qualitys.filter(q => q.id === e.quality);
                      e.quality = qual[0].name;
                    }
                    // console.log('items after filter',items);
                    filteredArray.push(e)

                    // console.log('give me e', e)
                  })
                  this.setState({
                    items: filteredArray
                  })
                })



              })

          })
      })
  }


  componentDidMount() {
    this.getData();
  }

  render() {
    // console.log('state at render', this.state.items)
    return (
      <>

        <div className="items-container">
          <div className="items-intro">
            <h1>Items</h1>
            {/* <img className="events-img" src={require('../../images/addyourevent.png')} alt="logo" /> */}
          </div>
          <MyClosetAddForm
            key={this.props.currentUser}
            {...this.props}
            getData={this.getData} />
          <div className="item-container-cards">
            {this.state.items.map(item => (
              <MyClosetCard
                key={item.id}
                item={item}
                deleteItem={this.deleteItem}
                {...this.props}
                currentUser={this.props.currentUser}
                getData={this.getData}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default MyClosetList;