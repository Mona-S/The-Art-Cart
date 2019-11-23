import React from 'react';

class CheckOutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'firstName': '',
      'lastName': '',
      'creditCardInfo': '',
      'address': '',
      'city': '',
      'state': '',
      'zip': '',
      formErrors: {
        firstName: '',
        lastName: '',
        creditCard: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      emptySubmit: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.cartTotalPrice = this.cartTotalPrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formValid(submission) {
    let errorsCopy = submission.formErrors;
    let firstNameCopy = submission.firstName;
    let lastNameCopy = submission.lastName;
    let creditCardCopy = submission.creditCard;
    let addressCopy = submission.address;
    let cityCopy = submission.city;
    let stateCopy = submission.state;
    let zipCopy = submission.zip;
    let valid = true;

    Object.values(errorsCopy).forEach(val => {
      val.length > 0 && (valid = false);
    });

    if (!firstNameCopy) {
      valid = false;
    } else if (!lastNameCopy) {
      valid = false;
    } else if (!creditCardCopy) {
      valid = false;
    } else if (!addressCopy) {
      valid = false;
    } else if (!cityCopy) {
      valid = false;
    } else if (!stateCopy) {
      valid = false;
    } else if (!zipCopy) {
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

    const letterRegex = RegExp(
      /^[A-Za-z]+$/
    );

    const zipRegex = RegExp(
      /^[0-9]{5}(?:-[0-9]{4})?$/
    );

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          letterRegex.test(value)
            ? ''
            : 'Input a valid name, letters only';
        break;
      case 'lastName':
        formErrors.lastName =
          letterRegex.test(value)
            ? ''
            : 'Input a valid name, letters only';
        break;
      case 'creditCard':
        formErrors.creditCard =
          ccRegex.test(value) && value.length === 16
            ? ''
            : 'Invalid credit card number';
        break;
      case 'address':
        formErrors.address =
          value.length < 6
            ? 'Mininum 6 characters required'
            : '';
        break;
      case 'city':
        formErrors.city =
          letterRegex.test(value)
            ? ''
            : 'Input a valid city, letters only';
        break;
      case 'state':
        formErrors.state =
          letterRegex.test(value)
            ? ''
            : 'Input a valid state, letters only';
        break;
      case 'zip':
        formErrors.zip =
          zipRegex.test(value)
            ? ''
            : 'Input a valid zip code, numbers only';
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let contact = this.state;

    if (this.formValid(this.state)) {
      this.props.placeOrder(contact, this.props.cart);
      this.setState({
        firstName: null,
        lastName: null,
        creditCard: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        formErrors: {
          firstName: '',
          lastName: '',
          creditCard: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        },
        earlySubmit: ''
      });
      this.props.setView('confirmation', {});
    } else {
      this.setState({ earlySubmit: 'Please correctly fill out all fields before submitting.' });
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
        <h3>Checkout</h3>
        <div>
          <button type="button" className="btn btn-outline-info"
            onClick={() => this.props.cartView('catalog', {})}>Back to Catalog</button>
        </div>
        <br></br>
        <p>Total ${(this.cartTotalPrice() / 100).toFixed(2)}</p>

        <form onSubmit={this.handleSubmit}>
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
            <input id="address"
              type="text"
              name="address"
              className={formErrors.address.length > 0 ? 'error form-control' : 'form-control'}
              onChange={this.handleChange} rows="3"
              placeholder="Shipping Address"></input>
            {formErrors.address.length > 0 && (
              <span className="invalidInput">{formErrors.address}</span>
            )}
          </div>

          <div className="form-group form">
            <label htmlFor="city">City</label>
            <input id="city"
              type="text"
              name="city"
              className={formErrors.city.length > 0 ? 'error form-control' : 'form-control'}
              onChange={this.handleChange}
              placeholder="City"></input>
            {formErrors.city.length > 0 && (
              <span className="invalidInput">{formErrors.city}</span>
            )}
          </div>

          <div className="form-group form">
            <label htmlFor="state">State</label>
            <input id="state"
              type="text"
              name="state"
              className={formErrors.state.length > 0 ? 'error form-control' : 'form-control'}
              onChange={this.handleChange}
              placeholder="State"></input>
            {formErrors.state.length > 0 && (
              <span className="invalidInput">{formErrors.state}</span>
            )}
          </div>

          <div className="form-group form">
            <label htmlFor="zip">Zip</label>
            <input id="zip"
              type="text"
              name="zip"
              className={formErrors.zip.length > 0 ? 'error form-control' : 'form-control'}
              onChange={this.handleChange}
              placeholder="Zip"></input>
            {formErrors.zip.length > 0 && (
              <span className="invalidInput">{formErrors.zip}</span>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-info">Place Your Order</button>
            <div className="invalidInput">{this.state.earlySubmit}</div>
          </div>

        </form>

      </React.Fragment>

    );

  }
}

export default CheckOutForm;
