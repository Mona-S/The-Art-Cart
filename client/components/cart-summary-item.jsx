import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      modalOpen: false
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleUpdateCallBack = this.handleUpdateCallBack.bind(this);
    this.handleDeleteCallBack = this.handleDeleteCallBack.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    if (newCount <= 1) {
      newCount = 1;
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

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    return (
      <React.Fragment>
        <div className="cartSummary">
          <h4 className="card-title productName">{this.props.name}</h4>
          <img src={this.props.image} alt="product1" className="summaryImage"/>
          {/* <i className="fas fa-plus-square"></i> */}
          <p className="card-data">Item Price ${(this.props.price / 100).toFixed(2)}</p>
          <div className="summaryButton">
            <button type="button" className="btn btn-success" onClick={this.increment}>+</button>
            {/* <p className="card-text"> {this.props.count}</p> */}
            <p className="card-box">  {this.state.count}</p>
            {/* <i className="fas fa-minus-square"></i> */}
            <button type="button" className="btn btn-danger" onClick={this.decrement}>-</button>

          </div>
          <br></br>
          <div className="updatedeleteButton">
            <button type="button" className="btn btn-info updateButton" onClick={this.handleUpdateCallBack}>Update</button>
            <div className="divider"></div>
            <button type="button" className="btn btn-danger deleteButton" onClick={this.toggleModal}>Delete</button>
          </div>
          {/* <p className="card-data">SubTotal $ {parseFloat((this.props.price / 100).toFixed(2) * (this.props.count))}</p> */}
          {/* <p className="card-data">{this.props.shortDescription}</p> */}

          <Modal isOpen={this.state.modalOpen}>
            <ModalHeader>
              Alert
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete {this.props.count} items of {this.props.name}?
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModal}>No</Button>
              <Button onClick={() => { this.toggleModal(); this.handleDeleteCallBack(); }} color="primary">Yes</Button>
            </ModalFooter>
          </Modal>
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
