import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckOutForm from './check-out-form';

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
    this.getCartItems = this.getCartItems.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

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
      .then(data => {
        this.setState({ cart: data });
        return data;
      })
      .catch(error => console.error('Error:', error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(productId) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(productId)
      })
    };

    fetch('/api/cart.php', req)
      .then(response => response.json())
      .then(data => {
        const allData = this.state.cart.concat(data);
        this.setState({ cart: allData });
      });
  }

  placeOrder(userInfo) {
    const order = {
      name: userInfo.customerName,
      creditCard: userInfo.creditCardInfo,
      shippingAddress: userInfo.shippingAddressInfo,
      cart: this.state.cart
    };

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    };

    fetch('/api/orders.php', req)
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: [] });
        this.setState({ name: 'catalog', params: {} });
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length} cartView={this.setView}></Header>
          <ProductList productView={this.setView}></ProductList>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length} cartView={this.setView}></Header>
          <ProductDetails productView={this.setView} params={this.state} cartAdd={this.addToCart}></ProductDetails>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length} cartView={this.setView}></Header>
          <CartSummary cartState={this.state.cart} cartView={this.setView} addToCart={this.addToCart}></CartSummary>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cart.length} cartView={this.setView}></Header>
          <CheckOutForm cartState={this.state.cart} cartView={this.setView} userInfo={this.placeOrder}></CheckOutForm>
        </React.Fragment>
      );
    }
  }
}
