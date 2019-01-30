import React, { Component } from 'react';
import './people-page.css';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';


export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPersonId: 3
  }

  onPersonSelected = (id) => {
    this.setState({ selectedPersonId: id })
  }

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {item => `${item.name} (${item.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPersonId} getData={this.swapiService.getPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}