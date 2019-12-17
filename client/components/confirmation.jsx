import React from 'react';

function Confirmation(props) {

  return (
    <React.Fragment>
      <div className="confirmation">
        <div className="confirmationPage">
          <button type="button" className="backToCatalogButton"
            onClick={() => props.cartView('catalog', {})}>Continue Shopping</button>
          <div className="orderNumber">
            <p className="orderModal">Thank you for your order !</p>
            <p className="orderModal">Your Order Number is</p>
            <p className="orderModal">{Math.floor(Math.random() * 100000)}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirmation;
