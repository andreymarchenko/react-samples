import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";

import './app.css';
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import {PersonList, StarshipList, PlanetList, PersonDetails, PlanetDetails, StarshipDetails} from "../sw-components"

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch()');
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets
        } = this.swapiService;

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />

                    <PersonDetails itemId={11} />
                    <PlanetDetails itemId={5} />
                    <StarshipDetails itemId={9} />

                    <PersonList>
                        { ({name}) => <span>{name}</span> }
                    </PersonList>
                    <StarshipList>
                        { ({name}) => <span>{name}</span> }
                    </StarshipList>
                    <PlanetList>
                        { ({name}) => <span>{name}</span> }
                    </PlanetList>
                </div>
            </ErrorBoundry>
        );
    }
};