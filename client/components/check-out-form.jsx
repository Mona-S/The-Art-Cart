import React from 'react';

class CheckOutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'customerName': '',
      'creditCardInfo': '',
      'shippingAddressInfo': ''
    };
    this.handleName = this.handleName.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.handleShippingAddress = this.handleShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cartTotalPrice = this.cartTotalPrice.bind(this);
  }

  handleName(event) {
    this.setState({ customerName: event.target.value });
  }

  handleCreditCard(event) {
    this.setState({ creditCardInfo: event.target.value });
  }

  handleShippingAddress(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  cartTotalPrice(props) {
    var cartTotal = this.props.cartState;
    var totalPrice = 0;
    for (var i = 0; i < cartTotal.length; i++) {
      totalPrice += parseFloat(cartTotal[i].price) * (cartTotal[i].count);
    }
    return totalPrice;
  }

  render() {
    return (
      <React.Fragment>
        <h3>Checkout</h3>
        <div>
          <button type="button" className="btn btn-outline-info"
            onClick={() => this.props.cartView('catalog', {})}>Back to Catalog</button>
        </div>
        <br></br>
        <p>Total ${(this.cartTotalPrice() / 100).toFixed(2)}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group form">
            <label >Name</label>
            <input type="text" value={this.state.customerName} className="form-control"
              onChange={this.handleName} placeholder="Enter Name"></input>
          </div>

          <div className="form-group form">
            <label >Credit Card</label>
            <input type="text" value={this.state.creditCardInfo} className="form-control"
              onChange={this.handleCreditCard} placeholder="Enter Credit Card"></input>
          </div>

          <div className="form-group form">
            <label >Shipping Address</label>
            <textarea value={this.state.shippingAddress} className="form-control"
              onChange={this.handleShippingAddress} placeholder="Enter Shipping Address" rows="3"></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-info">Place Your Order</button>
          </div>

        </form>

      </React.Fragment>

    );

  }
}

export default CheckOutForm;
