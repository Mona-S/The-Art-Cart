import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleUpdateCallBack = this.handleUpdateCallBack.bind(this);
    this.handleDeleteCallBack = this.handleDeleteCallBack.bind(this);
  }

  componentDidMount() {
    this.handleCount();
  }

  increment() {
    let count = this.state.count;
    let newCount = ++count;
    this.setState({ count: newCount });
  }

  decrement() {
    let count = this.state.count;
    let newCount = --count;
    if (newCount < 0) {
      newCount = 0;
    }
    this.setState({ count: newCount });
  }

  handleCount() {
    this.setState({
      count: this.props.count
    });
  }

  handleUpdateCallBack() {
    let newCount = this.state.count;
    this.props.updateCart(this.props.id, newCount);
    this.props.getCartItems();
  }

  handleDeleteCallBack() {
    this.props.updateCart(this.props.id, 0);
    this.props.getCartItems();
  }

  render() {
    return (
      <React.Fragment>
        <div className="cartSummary">
          <img src={this.props.image} alt="product1" className="summaryImage"/>
          <h4 className="card-title productName">{this.props.name}</h4>
          {/* <i className="fas fa-plus-square"></i> */}
          <button type="button" className="btn btn-success" onClick={this.increment}>+</button>
          {/* <p className="card-text"> {this.props.count}</p> */}
          <p className="card-text"> {this.state.count}</p>
          <button type="button" className="btn btn-info updateButton" onClick={this.handleUpdateCallBack}>Update</button>
          {/* <i className="fas fa-minus-square"></i> */}
          <button type="button" className="btn btn-danger" onClick={this.decrement}>-</button>
          <br></br>
          <br></br>
          <button type="button" className="btn btn-danger" onClick={this.handleDeleteCallBack}>Delete</button>
          <p className="card-text">Item Price ${(this.props.price / 100).toFixed(2)}</p>
          <p className="card-text">SubTotal $ {parseFloat((this.props.price / 100).toFixed(2) * (this.props.count))}</p>
          <p className="card-text">{this.props.shortDescription}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default CartSummaryItem;

// function CartSummaryItem(props) {
//   return (
//     <React.Fragment>
//       <div className="cartSummary">
//         <img src={props.image} alt="product1" className="summaryImage"/>
//         <h4 className="card-title productName">{props.name}</h4>
//         <i className="fas fa-plus-square"></i>
//         <p className="card-text"> {(props.count)}</p>
//         <button type="button" className="btn btn-info updateButton">Update</button>
//         <i className="fas fa-minus-square"></i>
//         <p className="card-text">Item Price ${(props.price / 100).toFixed(2)}</p>
//         <p className="card-text">Total Price for item $ {(props.price / 100).toFixed(2) * (props.count)}</p>
//         <p className="card-text">{props.shortDescription}</p>
//       </div>
//     </React.Fragment>

//   );

// return (
//     <React.Fragment>
//       <div className="cartSummary">
//         <img src={this.props.image} alt="product1" className="summaryImage"/>
//         <h4 className="card-title productName">{this.props.name}</h4>
//         <p className="card-text">Quantity {(this.props.count)}</p>
//         <p className="card-text">Item Price ${(this.props.price / 100).toFixed(2)}</p>
//         <p className="card-text">Total Price for item $ {(this.props.price / 100).toFixed(2) * (this.props.count)}</p>
//         <p className="card-text">{this.props.shortDescription}</p>
//       </div>
//     </React.Fragment>
//   );
