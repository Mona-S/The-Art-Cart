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
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);

  }

  setView(name, params) {
    this.setState({ view: {
      name: name,
      params: params
    } });
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }));
  }

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };

    fetch('/api/cart.php', req)
      .then(response => response.json())
      .then(data => {
        const allData = this.state.cart.concat(data);
        this.setState({ cart: allData });
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length}></Header>
          <ProductList productView={this.setView}></ProductList>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length}></Header>
          <ProductDetails productView={this.setView} params={this.state} cartAdd={this.addToCart}></ProductDetails>
        </React.Fragment>
      );
    }
  }
}
