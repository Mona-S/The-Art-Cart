import React from 'react';

function Header(props) {
  return (
    <React.Fragment>
      <h2 className='header'> Wicked Sales
        <img src="/images/shoponline logo.png" className="logo" alt="logo"></img>
        <div className="cart"> {props.cartItems} Items
          <i onClick={() => props.cartView('cart', {})} className="fas fa-shopping-cart"></i>
        </div>
      </h2>
    </React.Fragment>
  );

}

export default Header;
