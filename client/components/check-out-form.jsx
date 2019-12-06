import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class CheckOutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'firstName': '',
      'lastName': '',
      'creditCard': '',
      'address': '',
      formErrors: {
        firstName: '',
        lastName: '',
        creditCard: '',
        address: ''
      },
      blankSubmit: '',
      modalOpen: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.cartTotalPrice = this.cartTotalPrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  formValid(submission) {
    let errorsCopy = submission.formErrors;
    let firstNameData = submission.firstName;
    let lastNameData = submission.lastName;
    let creditCardData = submission.creditCard;
    let addressData = submission.address;
    let valid = true;

    Object.values(errorsCopy).forEach(val => {
      val.length > 0 && (valid = false);
    });

    if (!firstNameData) {
      valid = false;
    } else if (!lastNameData) {
      valid = false;
    } else if (!creditCardData) {
      valid = false;
    } else if (!addressData) {
      valid = false;
    }

    return valid;
  }

  handleChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    let formErrors = this.state.formErrors;

    const ccRegex = RegExp(
      /^\d+$/
    );

    const addressRegex = RegExp(
      /^[0-9]{1,5} +[a-zA-Z0-9 -]{1,},? +[A-Z]{2} +[0-9]{5}$/);

    const letterRegex = RegExp(
      /^[A-Za-z]+$/
    );

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          letterRegex.test(value)
            ? ''
            : 'Enter a valid name, letters only';
        break;
      case 'lastName':
        formErrors.lastName =
          letterRegex.test(value)
            ? ''
            : 'Enter a valid name, letters only';
        break;
      case 'creditCard':
        formErrors.creditCard =
          ccRegex.test(value) && value.length === 16
            ? ''
            : 'Invalid credit card number';
        break;
      case 'address':
        formErrors.address =
          addressRegex.test(value)
            ? ''
            : 'Enter a valid address';
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let contact = this.state;
    // console.log(this.formValid(this.state));
    // console.log(this.formValid(event));

    if (this.formValid(this.state)) {
      this.props.placeOrder(contact, this.props.cart);
      this.setState({
        firstName: null,
        lastName: null,
        creditCard: null,
        address: null,
        formErrors: {
          firstName: '',
          lastName: '',
          creditCard: '',
          address: ''
        },
        blankSubmit: ''
      });
      this.props.setView('confirmation', {});
    } else {
      this.setState({ blankSubmit: 'Please fill out all the required fields.' });
    }
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
    const { formErrors } = this.state;
    return (
      <React.Fragment>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>
              Alert !<br></br>
              Please do not enter your personal information.
            {/* Please be informed that details provided here are not stored in any systems.
              However, please refrain from providing personal information in this page. */}
          </ModalHeader>
          <ModalFooter>
            <Button onClick={this.toggleModal} color="info">OK</Button>
          </ModalFooter>
        </Modal>
        <h4 className="checkoutTitle">Checkout</h4>
        <div className="checkoutPage">
          <div>
            <button type="button" className="btn btn-outline-info"
              onClick={() => this.props.cartView('catalog', {})}>Back to Catalog</button>
          </div>
          <br></br>
          <p className="orderTotal">Order Total ${(this.cartTotalPrice() / 100).toFixed(2)}</p>

          <form onClick={this.handleSubmit}>
            <div className="form-group form">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName"
                type="text"
                name="firstName"
                className={formErrors.firstName.length > 0 ? 'error form-control' : 'form-control'}
                onChange={this.handleChange}
                placeholder="First Name"></input>
              {formErrors.firstName.length > 0 && (
                <span className="invalidInput">{formErrors.firstName}</span>
              )}
            </div>

            <div className="form-group form">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName"
                type="text"
                name="lastName"
                className={formErrors.lastName.length > 0 ? 'error form-control' : 'form-control'}
                onChange={this.handleChange}
                placeholder="Last Name"></input>
              {formErrors.lastName.length > 0 && (
                <span className="invalidInput">{formErrors.lastName}</span>
              )}
            </div>

            <div className="form-group form">
              <label htmlFor="creditCard">Credit Card</label>
              <input id="creditCard"
                type="text"
                name="creditCard"
                className={formErrors.creditCard.length > 0 ? 'error form-control' : 'form-control'}
                onChange={this.handleChange}
                maxLength="16"
                placeholder="xxxxxxxxxxxxxxxx"></input>
              {formErrors.creditCard.length > 0 && (
                <span className="invalidInput">{formErrors.creditCard}</span>
              )}
            </div>

            <div className="form-group form">
              <label htmlFor="address">Address</label>
              <textarea id="address"
                type="text"
                name="address"
                className={formErrors.address.length > 0 ? 'error form-control' : 'form-control'}
                onChange={this.handleChange} rows="3"
                placeholder="1234 Street Name, State Zip"></textarea>
              {formErrors.address.length > 0 && (
                <span className="invalidInput">{formErrors.address}</span>
              )}
            </div>

            <div>
              <button type="submit" className="placeOrderButton"
                onClick={() => { this.props.deleteCart(); this.props.cartView('confirmation', {}); }}>Place Order</button>
              <div className="invalidInput">{this.state.blankSubmit}</div>
            </div>

          </form>
        </div>
      </React.Fragment>

    );

  }
}

export default CheckOutForm;
