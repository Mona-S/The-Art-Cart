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
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cartTotalPrice = this.cartTotalPrice.bind(this);
  }

  handleName(event) {
    this.setState({ customerName: event.target.value });
  }

  handleCreditCard(event) {
    this.setState({ creditCardInfo: event.target.value });
  }

  handleShippingAddressInfo(event) {
    this.setState({ shippingAddressInfo: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  cartTotalPrice(props) {
    let totalPrice = 0;
    for (let i = 0; i < props.cartState.length; i++) {
      totalPrice += props.cartState[i].price;
    }
    return totalPrice;
  }

  render() {
    return (
      <React.Fragment>
        <h3>Checkout</h3>
        <p>Total ${(this.cartTotalPrice() / 100).toFixed(2)}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >Name</label>
            <input type="text" value="this.state.customerName" className="form-control"
              onChange={this.handleName} placeholder="Name"></input>
          </div>

          <div className="form-group">
            <label >Credit Card</label>
            <input type="text" value="this.state.creditCardInfo" className="form-control"
              onChange={this.handleCreditCard} placeholder="Credit Card"></input>
          </div>

          <div className="form-group">
            <label >Shipping Address</label>
            <textarea value="this.state.shippingAddressInfo" className="form-control"
              onChange={this.handleShippingAddressInfo} placeholder="Shipping Address" rows="3"></textarea>
          </div>

          <div>
            <button type="button" className="btn btn-outline-info"
              onClick={() => this.props.cartView('catalog', {})}>Back to Catalog</button>

            <button type="button" className="btn btn-outline-info">Checkout</button>
          </div>

        </form>

      </React.Fragment>

    );

  }
}

export default CheckOutForm;
