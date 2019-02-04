import React, { Component } from 'react';
import Row from '../row';
import {
  StarshipList,
  StarshipDetails
} from '../sw-components';

export default class StarshipsPage extends Component {

  state = {
    selectedItem: null
  }

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  }

  render() {
    return (
      <Row
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        right={<StarshipDetails itemId={this.state.selectedItem} />}
      />
    );
  }
}