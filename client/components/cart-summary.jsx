import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (props.totalItems === 0) {
    return (
      <React.Fragment>Cart is Empty</React.Fragment>
    );
  }
  const items = props.totalItems.map((item, index) => {
    return (
      <CartSummaryItem key={index}
        image= {item.image}
        name = {item.name}
        price = {item.price}
        shortDescription={item.shortDescription}/>
    );
  });

  const total = cartTotalPrice(props.totalItems);
  return (
    <div className= "container">
      <button type="button" className="btn btn-outline-info"
        onClick={() => this.props.productView('catalog', {})}>Back to Catalog</button>
      <h3>My Cart</h3>
      <div>{items}</div>
      <p>$ Total Price {(total / 100).toFixed(2)}</p>
    </div>
  );
}

function cartTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  return totalPrice;
}

export default CartSummary;
