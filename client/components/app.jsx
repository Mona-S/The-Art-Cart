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
      cart: [],
      cartLength: 0
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.getCartLength = this.getCartLength.bind(this);
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
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        cartArray += parseInt(cart[i].count);
      }
      this.setState({ cartLength: cartArray });
    }
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: data }, this.getCartLength);
      })
      // return data;
      // .then(cart => {
      //   this.setState({ cart }, () => this.getCartLength(cart));
      // })
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
    // .then(response => { this.getCartItems(); });
    // .then(response => response.json())
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
          <CheckOutForm cartState={this.state.cart} cartView={this.setView} userInfo={this.placeOrder}></CheckOutForm>
        </React.Fragment>
      );
    }
  }
}
