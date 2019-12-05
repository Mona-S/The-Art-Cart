import React from 'react';

function Header(props) {
  return (
    <React.Fragment>
      <div className='header'>
        <h2 className='headerTitle'> The Art-Cart </h2>
        <img src="/images/shoponline logo.png" className="logo" alt="logo"></img>
        <div className="cart"> {props.cartItems}
          <i onClick={() => props.cartView('cart', {})} className="fas fa-shopping-cart"></i>

        </div>

      </div>
    </React.Fragment>
  );

}

export default Header;
