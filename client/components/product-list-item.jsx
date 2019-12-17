import React from 'react';

function ProductListItem(props) {

  return (
    <div className="listItem" onClick={() => props.setView('details', { id: props.id })}>
      <div className="card-body">
        <img src={props.image[0]} alt="product1" className="card-img"/>
        <p className="cardHeading">{props.name}</p>
        <p className="cardPrice">${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">{props.short_description}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
