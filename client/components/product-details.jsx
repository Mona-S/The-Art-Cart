import React from 'react';
import ProductListItem from './product-list-item';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.view.params.id)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));

  }

  render() {
    if (this.state.product !== null) {
      return (
        <ProductListItem key = {this.state.product.id}
          id = {this.state.product.id}
          name = {this.state.product.name}
          price = {this.state.product.price}
          image = {this.state.product.image}
          shortDescription = {this.state.product.shortDescription}/>
      );
    }
    return null;
  }
}

export default ProductDetails;
