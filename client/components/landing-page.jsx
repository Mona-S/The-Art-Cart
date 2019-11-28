import React from 'react';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>This is a demo site and the products are not on sale</h3>
        <button type="button" className="btn btn-outline-info"
          onClick={() => this.props.cartView('catalog', {})}>I Agree</button>
      </React.Fragment>
    );
  }
}

export default LandingPage;
