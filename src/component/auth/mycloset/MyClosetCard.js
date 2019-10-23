import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import {firstLetterCase} from '../../modules/helpers'
import MyClosetManager from '../../modules/MyClosetManager'

class MyClosetCard extends Component {
  
  handleDelete = (id) => {
    MyClosetManager.delete(id)
    .then(() => this.props.getData());
  }
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <picture>
            {/* <img src={require(`../../images/${this.props.animal.url}`)} alt="Animal" /> */}
          </picture>
          <h3>Name: <span className="card-petname">{(this.props.item.name)}</span></h3>
          {/* <p>Breed: {this.props.item.breed} </p> */}
          <Link to={`/items/${this.props.item.id}`}><button>Details</button></Link>
          <button type="button" onClick={() => {this.props.history.push(`/items/${this.props.item.id}/edit`)}}>Edit</button>
          <button type="button" onClick={() => this.props.handleDelete(this.props.item.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default MyClosetCard;