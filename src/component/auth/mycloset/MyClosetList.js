import React, { Component } from 'react'
import MyClosetCard from './MyClosetCard'
import MyClosetManager from '../../modules/MyClosetManager'


class MyClosetList extends Component {
    //define what this component needs to render
    state = {
        items: [],
    }

    deleteItem = id => {
        MyClosetManager.delete(id)
            .then(() => {
                MyClosetManager.getAll()
                    .then((newItems) => {
                        this.setState({
                            items: newItems
                        })
                    })
            })
    }

    getData = () => {
        //getAll from MyClosetManager and hang on to that data; put it in state
        MyClosetManager.getAll()
            .then((items) => {
                this.setState({
                    items: items
                })
            })
    }

    componentDidMount() {
        this.getData()
    }
    
    render() {
        return (
            <>
            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { this.props.history.push("/items/new") }}>
                    Add New Item
                </button>
            </section>
            <div className="container-cards">
                {this.state.items.map(item =>
                    <MyClosetCard
                        key={item.id}
                        item={item}
                        deleteItem={this.deleteItem} 
                        {...this.props}/>)}
            </div>
            </>
        )
    }

}

export default MyClosetList