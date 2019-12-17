import React from 'react';
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

  render() {
    if (this.state.product !== null) {
      return (
        <div key = {this.state.product.id} className="container itemDetails">

          <button type="button" className="backToCatalogButton"
            onClick={() => this.props.productView('catalog', {})}>Back to Catalog</button>

          <div className="rowImage">
            <div className="detailContainer">
              <img src={this.state.product.image} className="detailImage" alt="OneItem" />
            </div>

            <div className="short rowProductDetails">
              <p className="card-title productTitle">{this.state.product.name}</p>
              <b>${(this.state.product.price / 100).toFixed(2)}</b>
              <br></br>
              <p className="cardtextProduct">{this.state.product.short_description}</p>
              <button type="button" className="addToCartButton" onClick={() => { this.toggleModal(); this.props.cartAdd(this.state.product.id); }}>Add to Cart </button>
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
