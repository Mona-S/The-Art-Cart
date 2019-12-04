import React from 'react';

function Confirmation(props) {

  return (
    <React.Fragment>
      {/* <div className="confirmation">
      <button type="button" className="btn btn-outline-info"
        onClick={() => props.cartView('catalog', {})}>Continue Shopping</button>
      <h4>Thank you for your order</h4>
      <h3>Your Order Number is</h3>
      <h3>{Math.floor(Math.random() * 100000)}</h3> */}

      <div className="confirmation">
        <button type="button" className="btn btn-info"
          onClick={() => props.cartView('catalog', {})}>Continue Shopping</button>
        <div className="orderNumber">
          <br></br>
          <h3>Thank you for your order !</h3>
          {/* <p>This is a demo site and the products are not on sale</p> */}
          <h4>Your Order Number is</h4>
          <h4>{Math.floor(Math.random() * 100000)}</h4>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirmation;
