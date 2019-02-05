import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';

import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';

import { StarshipDetails } from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';

class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    });
  }

  toggleRandomPlanet = () => {
    this.setState({
      showRandomPlanet: !this.state.showRandomPlanet
    });
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  render() {
    const { isLoggedIn } = this.state;
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} isLoggedIn={isLoggedIn} />

              {planet}

              <div className="row mr-0 ml-0">
                <div className="col-md-12 button-row">
                  <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                  </button>
                  <ErrorButton />
                </div>
              </div>

              <Switch>
                <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact />
                <Route path="/people/:id?" component={PeoplePage} exact />
                <Route path="/planets/:id?" component={PlanetsPage} exact />
                <Route path="/starships" component={StarshipsPage} exact />

                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />
                  }}
                />

                <Route
                  path="/login"
                  render={() => <LoginPage onLogin={this.onLogin} isLoggedIn={isLoggedIn} />} />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />} />

                <Route render={() => <h2>Page Not Found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};

export default App;