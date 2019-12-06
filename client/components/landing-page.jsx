import React from 'react';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="mainpage">
          <div className="disclaimer">
            <br></br>
            <h5>DISCLAIMER</h5>
            <br></br>
            {/* <p>This is a demo site and the products are not on sale</p> */}
            <p>Please be informed that this is a demo site and the products are not on sale.
              <br></br>
            The products displayed are not real and do not represent the actual cost of the products</p>
            {/* <p>Please be aware that do not store any information that you provide during this demo</p> */}
            <p>Please click I Agree to continue  </p>
            <button type="button" className="btn btn-info agreeButton"
              onClick={() => this.props.cartView('catalog', {})}>I Agree</button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;
