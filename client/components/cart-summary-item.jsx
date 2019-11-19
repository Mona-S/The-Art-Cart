import React from 'react';

// return (
//     <React.Fragment>
//       <div className="cartSummary">
//         <img src={props.image} alt="product1" className="summaryImage"/>
//         <h4 className="card-title productName">{props.name}</h4>
//         <p className="card-text">Quantity {(props.count)}</p>
//         <p className="card-text">Item Price ${(props.price / 100).toFixed(2)}</p>
//         <p className="card-text">Total Price for item $ {(props.price / 100).toFixed(2) * (props.count)}</p>
//         <p className="card-text">{props.shortDescription}</p>
//       </div>
//     </React.Fragment>

//   );

function CartSummaryItem(props) {
  return (
    <React.Fragment>
      <div className="cartSummary">
        <img src={props.image} alt="product1" className="summaryImage"/>
        <h4 className="card-title productName">{props.name}</h4>
        <i className="fas fa-plus-square"></i>
        <p className="card-text"> {(props.count)}</p>
        <i className="fas fa-minus-square"></i>
        <p className="card-text">Item Price ${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">Total Price for item $ {(props.price / 100).toFixed(2) * (props.count)}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </React.Fragment>

  );
}

export default CartSummaryItem;
