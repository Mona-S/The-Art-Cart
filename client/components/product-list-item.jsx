import React from 'react';

function ProductListItem(props) {

  return (
    <div className="col-md-3 mb-3 listItem" onClick={() => props.setView('details', { id: props.id })}>
      <div className="card-body">
        <img src={props.image} alt="product1" className="card-img"/>
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">{props.short_description}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
