import React from 'react';

function CartSummaryItem(props) {
  return (
    <React.Fragment>
      <div className="cartSummary">
        <img src={props.image} alt="product1" className="summaryImage"/>
        <h4 className="card-title productName">{props.name}</h4>
        <p className="card-text">${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </React.Fragment>

  );
}

export default CartSummaryItem;
