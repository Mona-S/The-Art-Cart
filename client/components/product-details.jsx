import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.params.view.params.id)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));

  }

  render() {
    if (this.state.product !== null) {
      return (
        <div key = {this.state.product.id} className="container itemDetails">

          <button type="button" className="btn btn-outline-info"
            onClick={() => this.props.productView('catalog', {})}>Back to Catalog</button>

          <div className="row">
            <div className="col-12 col-md-8">
              <img src={this.state.product.image} className="card-img" alt="OneItem" />
            </div>

            <div className="col-6 col-md-4 short">
              <h4 className="card-title">{this.state.product.name}</h4>
              <p className="card-text badge badge-info">${(this.state.product.price / 100).toFixed(2)}</p>
              <p className="card-text">{this.state.product.shortDescription}</p>
            </div>

          </div>
          <div >
            <p className = "card-text">{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default ProductDetails;
