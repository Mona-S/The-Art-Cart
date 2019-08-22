import React from 'react';

function ProductListItem(props) {

  return (
    <div className="card col-md-3 mb-3">
      <div className="card-body">
        <img src={props.image} alt="product1" className="card-img"/>
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">${props.price}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
