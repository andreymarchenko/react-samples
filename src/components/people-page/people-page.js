import React, {Component} from "react";

import  './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundry";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => (`${name} (${gender}, ${birthYear})`)}/>
            );

        const personDetails = (
            <ErrorBoundary>
                <ItemDetails personId={this.state.selectedPerson}/>
            </ErrorBoundary>
        );

        return (
            <Row left={itemList} right={personDetails}/>
        );
    }
}