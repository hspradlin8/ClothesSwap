import React, { Component } from 'react';
import MyClosetManager from '../../modules/MyClosetManager';


class MyClosetDetail extends Component {

    state = {
        itemName: "",
        quality: "",
        color: "",
        // type: "",
        size: "",
        description: "",
        url: "",
        loadingStatus: true
    }

    handleDelete = () => {
        //invoke the delete function in MyClosetManger and re-direct to the MyCloset list.
        this.setState({ loadingStatus: true })
        MyClosetManager.delete(this.props.itemId)
            .then(() => this.props.history.push("/items"))
    }
    componentDidMount() {
        //get(id) from MyClosetManager and hang on to that data; put it into state
        MyClosetManager.get(this.props.itemId)
            .then((item) => {
                this.setState({
                    // id: this.props.item.id,
                    itemName: this.state.itemName,
                    quality: this.state.quality,
                    color: this.state.color,
                    size: this.state.size,
                    description: this.state.description,
                    url: item.url,
                    loadingStatus: false
                });
            });
    }
    // imagePath = "../images"
    render() {
        if (this.state.loadingStatus) {
            return <p>Loading...</p>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <picture>
                        {/* <img src={require(`../../images/${this.state.url}`)} alt="Animal" /> */}
                    </picture>
                    <h3>Name: <span style={{ color: 'darkslategrey' }}>{this.state.name}</span></h3>
                    {/* <p>Breed: {this.state.breed}</p> */}
                    <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        );
    }
}

export default MyClosetDetail;