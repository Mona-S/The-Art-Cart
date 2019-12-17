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
            <p className="disclaimerNote">This website is for demonstration purposes only.</p>
            <p className="disclaimerNote">No information will be stored and the products displayed are not real</p>
            <p className="disclaimerNote">Please click I Agree to continue  </p>
            <button type="button" className="btn btn-info agreeButton"
              onClick={() => this.props.cartView('catalog', {})}>I Agree</button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;
