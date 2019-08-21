import React from 'react';
import Header from './header';
import ProductListItem from './product-list-item';
import ProductList from './product-list';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <ProductListItem></ProductListItem>
        <ProductList></ProductList>
      </React.Fragment>
    );
  }
}
