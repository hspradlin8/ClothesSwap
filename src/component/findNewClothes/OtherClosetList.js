import React, { Component } from "react";
import OtherClosetCard from "./OtherClosetCard";
import APIManager from "../modules/APIManager";
import OtherClosetForm from "./OtherClosetForm";


class OtherClosetList extends Component {
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

  // where the id is user specific- only gettting items related to the userId for other closet list.
  getDataAgain = () => {
    let notMyItems = []
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAllNotMyClothes("items", this.props.currentUser)
      .then(items => {
        // console.log("Dylan is awesome", items)
        items.forEach(element => {
          // console.log(element)
          if (element.userId !== parseInt(this.props.currentUser)) {
            // console.log(element.userId)
            notMyItems.push(element)
          }
        });

      }).then(() => {
        this.setState({
          items: notMyItems
        });
      })
  }

  getData = () => {
    console.log("OtherClosetList getData")
    let types = []
    let qualitys = []
    let colors = []
    APIManager.getAll("type")
      .then((type) => {
        types = type
      }).then(() => {

        APIManager.getAll("color")
          .then((color) => {
            colors = color
          }).then(() => {

            APIManager.getAll("quality")
              .then((quality) => {
                qualitys = quality
              }).then(() => {

                APIManager.getAllNotMyClothes("items", this.props.currentUser)
                  .then(items => {
                    console.log(items)
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
                      // console.log('items after filter', items);
                      filteredArray.push(e)

                      this.setState({
                        items: filteredArray
                      })
                    });

                  })
              })
          })

      }).then(() => {
        //this.getDataAgain()
      })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <div className="items-container">
          <div className="items-intro">
            <h1>Items</h1>
            {/* <img className="events-img" src={require('../../images/addyourevent.png')} alt="logo" /> */}
          </div>
          <OtherClosetForm
            {...this.props}
            // itemId={this.props.item.id}
            getData={this.props.getData}
            toggle={this.toggle}
          />
          <div className="item-container-cards">
            {this.state.items.map(item =>
              <OtherClosetCard
                key={item.id}
                item={item}
                deleteItem={this.deleteItem}
                {...this.props}
                getData={this.getData}
                currentUser={this.props.currentUser}

              />

            )}
          </div>
        </div>
      </>
    );
  }
}
export default OtherClosetList;