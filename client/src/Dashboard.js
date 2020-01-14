import React, { Component } from 'react';
import data from './data';
import ProductList from './ProductList';
import './Dashboard.css';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
        <div className="products">
          <h2>Products:</h2>
          <ProductList data={data} />
        </div>
      </div>
    );
  }
}

export default CommentBox;