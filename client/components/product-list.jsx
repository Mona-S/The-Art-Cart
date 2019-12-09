import React from 'react';
import ProductListItem from './product-list-item';

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

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const products = this.state.products.map(data => {
      return (
        <ProductListItem key = {data.id}
          id = {data.id}
          name = {data.name}
          price = {data.price}
          image = {data.image}
          shortDescription = {data.short_description}
          setView={this.props.productView}/>
      );
    });

    return (
      <div className="containerCatalog">
        <div className="rowCatalog">
          {products}
        </div>
      </div>
    );
  }
}
export default ProductList;
