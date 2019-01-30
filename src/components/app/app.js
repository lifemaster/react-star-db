import React, { Component } from 'react';

import Header from '../header';
// import RandomPlanet from '../random-planet';
// import ErrorButton from '../error-button';

import './app.css';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  }

  // toggleRandomPlanet = () => {
  //   this.setState(state => {
  //     return {
  //       showRandomPlanet: !state.showRandomPlanet
  //     }
  //   });
  // }

  render() {
    // const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {/* {planet}

          <div className="row mr-0 ml-0">
            <div className="col-md-12 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
              <ErrorButton />
            </div>
          </div> */}

          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={9} />

          <PersonList />
          <StarshipList />
          <PlanetList />

          {/* <Row left={personDetails} right={starshipDetails} /> */}
        </div>
      </ErrorBoundry>
    );
  }
};

export default App;