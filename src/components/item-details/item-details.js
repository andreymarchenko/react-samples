import React, { Component } from 'react';

import './item-details.css'

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState( {item, loading: false} );
    };

    onError = (err) => {
        this.setState( {
            loading: false,
            error: true
        });
    };

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        this.setState( {loading: true} );

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        if (!this.state.item) {
            return <span>Select a item from a list</span>;
        }

        const {item, error, loading, image } = this.state;

        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ?
            <ItemView
                item={item}
                image={image}
                elems={
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { item });
                    })
                }
            />
            : null;

        return (
            <div className="item-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemView = ( {item, image, elems} ) => {
    const {name} = item;

    return (
        <React.Fragment>
            <img className="item-image"
                 src={image}
                 alt='character'/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { elems }
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    );
};

export {
    Record
};