import React, { Component } from 'react';
import 'whatwg-fetch';
import ProductList from './ProductList';
import Product from './Product';
import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      user: '',
      product: '',
      detail: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadProductsFromServer();
    // if (!this.pollInterval) {
    //   this.pollInterval = setInterval(this.loadProductsFromServer, 2000);
    // }
  }

  // componentWillUnmount() {
  //   if (this.pollInterval) clearInterval(this.pollInterval);
  //   this.pollInterval = null;
  // }

  loadProductsFromServer = () => {
    fetch('/api/products/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="products">
          <h2>Products:</h2>
          <ProductList data={this.state.data} />
        </div>
      <div className="form">
        <Product user={this.state.user} product={this.state.product} detail={this.state.detail} />
      </div>
      {this.state.error && <p>{this.state.error}</p>}
    </div>
    );
  }
}

export default Dashboard;