import React from 'react';

function CartSummaryItem(props) {
  return (
    <React.Fragment>
      <img src={props.image} alt="product1" className="card-img"/>
      <h4 className="card-title">{props.name}</h4>
      <p className="card-text">${(props.price / 100).toFixed(2)}</p>
      <p className="card-text">{props.shortDescription}</p>
    </React.Fragment>

  );
}

export default CartSummaryItem;
