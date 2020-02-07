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
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadProductsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadProductsFromServer = () => {
    fetch('/api/products/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  onChangeProduct = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitProduct = (e) => {
    e.preventDefault();
    const { product, detail } = this.state;
    if (!product || !detail) return;
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, detail }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ product: '', detail: '', error: null });
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
      <form onSubmit={this.submitProduct}>
        <input
          type="text"
          name="product"
          placeholder="Product..."
          value={this.product}
          onChange={this.onChangeProduct}
        />
        <input
          type="text"
          name="detail"
          placeholder="Product Details..."
          value={this.detail}
          onChange={this.onChangeProduct}
        />
        <button type="submit">Submit</button>
      </form>
        <Product
          product={this.state.product}
          detail={this.state.detail}
          handleChangeProduct={this.onChangeProduct}
          handleSubmit={this.submitProduct}
        />
      </div>
      {this.state.error && <p>{this.state.error}</p>}
    </div>
    );
  }
}

export default Dashboard;