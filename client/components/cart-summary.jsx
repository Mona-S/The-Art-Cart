import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  // const cartArray = props.cartItems;

  return (
    <React.Fragment>
      <h3>Total Price</h3>
      <CartSummaryItem></CartSummaryItem>
    </React.Fragment>
  );
}

export default CartSummary;

// getCartTotal(myArray);
//   return getCartTotal;
//   }
// function getCartTotal(cartItems) {
//   var total = 0;
//   for (var i = 0; i < cartItems.length; i++){
//     total += carItems[i].price;
//   }
//   return total;
// }
