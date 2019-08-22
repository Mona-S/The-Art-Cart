import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('/api/products.php')
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container1">
          <div className="row">
            <div className="col-sm">
            1
            </div>
            <div className="col-sm">
            2
            </div>
            <div className="col-sm">
            3
            </div>
          </div>
        </div>

        <div className="container2">
          <div className="row">
            <div className="col-sm">
            4
            </div>
            <div className="col-sm">
            5
            </div>
            <div className="col-sm">
            6
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;
