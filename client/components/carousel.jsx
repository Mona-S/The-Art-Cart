import React from 'react';

class Carousel extends React.Component {
  render() {
    let productsArr = this.props.products;
    return (
      <React.Fragment>
        <div id="carousel-products" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={ productsArr.image[0] } />
            </div>
            <div className="carousel-item ">
              <img className="d-block w-100" src={ productsArr.image[1] } />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={ productsArr.image[2] }/>
            </div>
          </div>
          <a className="carousel-control-prev " href="#carousel-products" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon carouselColor" ></span>
            <span className="sr-only">Previous</span>
          </a>

          <a className="carousel-control-next" href="#carousel-products" role="button" data-slide="next">
            <span className="carousel-control-next-icon carouselColor" ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Carousel;
