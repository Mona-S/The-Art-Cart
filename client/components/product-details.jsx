import React from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.params.view.params.id)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  productCarousel() {
    let product = this.state.product;
    let imageArray = product.image;
    let carousel = imageArray.map(element => {
      return (
        <div key={imageArray.indexOf(element)}>
          <img className="carouselImage" src={element}/>
        </div>
      );
    });
    return carousel;
  }

  render() {
    if (this.state.product !== null) {
      return (
        <div key = {this.state.product.id} className="container itemDetails">

          <button type="button" className="btn btn-outline-info"
            onClick={() => this.props.productView('catalog', {})}>Back to Catalog</button>

          <div className="rowImage">
            <div className="col-12 col-md-8">
              <img src={this.state.product.image} className="card-img" alt="OneItem" />
              {/* <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                width="30vw"
                interval={2500}
                infiniteLoop={true}
                stopOnHover={true}>
                {this.productCarousel()}
              </Carousel> */}

            </div>

            <div className="col-6 col-md-4 short rowProductDetails">
              {/* <p className="card-text badge badge-info">${(this.state.product.price / 100).toFixed(2)}</p> */}
              <h4 className="card-title">{this.state.product.name}</h4>
              <b>${(this.state.product.price / 100).toFixed(2)}</b>

              <p className="cardtextProduct">{this.state.product.short_description}</p>
              <button type="button" className="btn btn-info add-to-cart-button" onClick={() => { this.toggleModal(); this.props.cartAdd(this.state.product.id); }}>Add to Cart </button>
            </div>

          </div>
          <div >
            <p className = "cardtextProduct">{this.state.product.longDescription}</p>
          </div>

          <Modal isOpen={this.state.modalOpen}>
            <ModalHeader>
              {this.state.product.name} added to cart!
            </ModalHeader>
            <ModalFooter>
              <Button onClick={this.toggleModal} color="info">Continue Shopping</Button>
              <Button onClick={() => this.props.productView('cart', {})} color="primary">View Cart</Button>
            </ModalFooter>
          </Modal>

        </div>
      );
    }
    return null;
  }
}

export default ProductDetails;
