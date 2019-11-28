import React from 'react';

function Confirmation(props) {

  return (
    <React.Fragment>
      <button type="button" className="btn btn-outline-info"
        onClick={() => props.cartView('catalog', {})}>Continue Shopping</button>
      <h4>Thank you for your order</h4>
      <h3>Your Order Number is</h3>
      <h3>{Math.floor(Math.random() * 100000)}</h3>
    </React.Fragment>
  );
}

export default Confirmation;
