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
    console.log("test");
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
    //console.log("all", items);
    // items.forEach(e => {
    //   e.type = this.state.type.filter(t => t.id === e.type)
    // });
    this.setState({
      items: items
    })
  });


  componentDidMount() {
    let types = []
    APIManager.getAll("type")
      .then((type) => {
        //  console.log(type)
        types = type
      }).then(() => {

        let colors = []
        APIManager.getAll("color")
          .then((color) => {
            console.log(color)
            colors = color
          }).then(() => {

            let qualitys = []
            APIManager.getAll("quality")
              .then((quality) => {
                console.log(quality)
                qualitys = quality
              }).then(() => {

                APIManager.getAllMyClothes("items", parseInt(this.props.currentUser)).then(items => {
                  let filteredArray = []
                  items.forEach(e => {
                    var ty = types.filter(t => t.id === e.type);
                    e.type = ty[0].name;
                    var col = colors.filter(c => c.id === e.color);
                    e.color = col[0].name;
                    var qual = qualitys.filter(q => q.id === e.quality);
                    e.quality = qual[0].name;
                    //console.log('items after filter',items);
                    filteredArray.push(e)
                    console.log('filtered array', filteredArray)
                  })
                  this.setState({
                    items: filteredArray
                  })
                })
                  
                

              })

          })
      })
  }

  render() {
    console.log('state at render', this.state.items)
    return (
      <>
      
        <div className="items-container">
          <div className="items-intro">
            <h1>Items</h1>
            {/* <img className="events-img" src={require('../../images/addyourevent.png')} alt="logo" /> */}
          </div>
          {/* <MyClosetAddForm key={this.props.currentUser} {...this.props}
            getData={this.getData} /> */}
          <div className="item-container-cards">
            {this.state.items.map(item => (
              <MyClosetCard
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
export default MyClosetList;