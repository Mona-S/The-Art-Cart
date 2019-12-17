import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckOutForm from './check-out-form';
import Confirmation from './confirmation';
import LandingPage from './landing-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'landing-page',
        params: {}
      },
      cart: [],
      cartLength: 0
    };
    this.alreadyUsed = 0;
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.getCartLength = this.getCartLength.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

  }

  setView(name, params) {
    this.setState({ view: {
      name: name,
      params: params
    } });
  }

  getCartLength() {
    let cart = this.state.cart;
    let cartArray = null;
    for (let i = 0; i < cart.length; i++) {
      cartArray += parseInt(cart[i].count);
    }
    this.setState({ cartLength: cartArray });
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: data }, this.getCartLength);
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
      .then(() => {
        const allData = this.state.cart.concat(productId);
        this.setState({ cart: allData });
      })
      .finally(() => this.getCartItems());
  }

  updateCart(productId, count) {
    fetch('/api/cart.php', {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(productId),
        newCount: count
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .finally(() => this.getCartItems());
  }

  deleteCart() {
    fetch('/api/cart_delete.php', {
      method: 'PUT',
      body: JSON.stringify(),
      headers: { 'Content-Type': 'application/json' }
    })
      .finally(() => this.getCartItems());
  }

  placeOrder(contact, userInfo) {
    let order = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      creditCard: contact.creditCardInfo,
      shippingAddress: contact.shippingAddressInfo,
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
          <Header cartItems={this.state.cartLength} cartView={this.setView} getCartItems={this.getCartItems}></Header>
          <ProductList productView={this.setView}></ProductList>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cartLength} cartView={this.setView} getCartItems={this.getCartItems}></Header>
          <ProductDetails productView={this.setView} params={this.state} cartAdd={this.addToCart} getCartItems={this.getCartItems}></ProductDetails>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cartLength} cartView={this.setView} getCartItems={this.getCartItems}></Header>
          <CartSummary cartState={this.state.cart} cartView={this.setView} updateCart={this.updateCart} addToCart={this.addToCart} getCartItems={this.getCartItems}></CartSummary>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cartLength} cartView={this.setView} getCartItems={this.getCartItems}></Header>
          <CheckOutForm cartState={this.state.cart} cartView={this.setView} placeOrder={this.placeOrder} deleteCart={this.deleteCart}></CheckOutForm>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'confirmation') {
      return (
        <React.Fragment>
          <Header cartItems={this.state.cartLength} cartView={this.setView}></Header>
          <Confirmation cartState={this.state.cart} cartView={this.setView}></Confirmation>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'landing-page') {
      return (
        <React.Fragment>
          <Header></Header>
          <LandingPage cartView={this.setView}></LandingPage>
        </React.Fragment>
      );
    }
  }
}
