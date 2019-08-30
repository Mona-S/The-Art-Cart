import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (props.cartState === 0) {
    return (
      <React.Fragment>Cart is Empty</React.Fragment>
    );
  }
  const items = props.cartState.map(item => {
    return (
      <CartSummaryItem key={item.id}
        image= {item.image}
        name = {item.name}
        price = {item.price}
        shortDescription={item.shortDescription}/>
    );
  });

  const total = cartTotalPrice(props);
  return (
    <div className= "container">
      <button type="button" className="btn btn-outline-info"
        onClick={() => props.cartView('catalog', {})}>Back to Catalog</button>
      <h3>My Cart</h3>
      <div>{items}</div>
      <br></br>
      <div className="totalPrice"><h5>Total Price ${(total / 100).toFixed(2)}</h5></div>
      <br></br>
      <button type="button" className="btn btn-info"
        onClick={() => props.cartView('checkout', {})}>Checkout</button>
    </div>
  );
}

function cartTotalPrice(props) {
  let totalPrice = 0;
  for (let i = 0; i < props.cartState.length; i++) {
    totalPrice += props.cartState[i].price;
  }
  return totalPrice;
}

export default CartSummary;
