import React, { Component } from 'react';
import './item-details.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}:</span>
      <span>{item[field]}</span>
    </li>
  );
}

export { Record };

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    isLoading: false,
    hasError: null
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({ isLoading: true, hasError: false });

    getData(itemId)
      .then(item => {
        this.setState({
          item,
          image: getImageUrl(item),
          isLoading: false
        });
      })
      .catch(this.onError);
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl
      ) {
      this.updateItem();
    }
  }

  componentWillUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ loading: true });
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onError = (err) => {
    this.setState({ isLoading: false, error: true });
  }

  render() {
    const { item, image, hasError, isLoading } = this.state;

    if(isLoading) {
      return <Spinner />
    }

    if (hasError) {
      return <ErrorIndicator />;
    }

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, child => {
              return React.cloneElement(child, { item });
            })
          }
          </ul>
          <div className="mt-3 mb-3">
            <ErrorButton />
          </div>
        </div>
      </div>
    );
  }
}