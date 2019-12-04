import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (props.cartState.length === 0) {
    return (
      <React.Fragment>
        <div className="emptyCart">
          <button type="button" className="btn btn-info"
            onClick={() => props.cartView('catalog', {})}>Back to Catalog</button>
          <h3 className="emptyCartModal">Your Cart is Empty</h3>
        </div>
      </React.Fragment>
    );
  }
  const items = props.cartState.map((item, index) => {
    return (
      <CartSummaryItem key={index}
        id={item.productID}
        image= {item.image}
        name = {item.name}
        price = {item.price}
        count = {item.count}
        updateCart = {props.updateCart}
        getCartItems = {props.getCartItems}
        deleteFromCart = {props.deleteFromCart}/>
      // shortDescription={item.short_description}/>
    );
  });

  const total = cartTotalPrice(props);
  return (
    <div className= "container">
      <button type="button" className="btn btn-outline-info"
        onClick={() => props.cartView('catalog', {})}>Back to Catalog</button>
      <h2 className="myCart">Cart Summary</h2>
      <div>{items}</div>
      <div className="totalPrice"><h5>Order Total ${(total / 100).toFixed(2)}</h5></div>
      <button type="button" className="btn btn-info"
        onClick={() => props.cartView('checkout', {})}>Checkout</button>
    </div>
  );
}

function cartTotalPrice(props) {
  let totalPrice = 0;
  for (let i = 0; i < props.cartState.length; i++) {
    totalPrice += parseFloat(props.cartState[i].price) * (props.cartState[i].count);
  }
  return totalPrice;
}

export default CartSummary;
