import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);

  }

  setView(name, params) {
    this.setState({ view: {
      name: name,
      params: params
    } });
  }

  render() {
    // console.log('hi', this.view.name);
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header></Header>
          <ProductList productView={this.setView}></ProductList>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header></Header>
          <ProductDetails productView={this.setView} params={this.state}></ProductDetails>
        </React.Fragment>
      );
    }
  }
}
