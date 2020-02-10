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
      product: '',
      detail: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadItemsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadItemsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadItemsFromServer = () => {
    fetch('/api/items/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  onChangeItem = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onUpdateItem = (id) => {
    const oldItem = this.state.data.find(c => c._id === id);
    if (!oldItem) return;
    this.setState({
        product: oldItem.product,
        detail: oldItem.detail,
        updateId: id
    });
  }

  onDeleteItem = (id) => {
    const i = this.state.data.findIndex(c => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    fetch(`api/items/${id}`, { method: 'DELETE' })
      .then(res => res.json()).then((res) => {
        if (!res.success) this.setState({ error: res.error });
      });
  }

  submitItem = (e) => {
    e.preventDefault();
    const { product, detail, updateId } = this.state;
    if (!product || !detail) return;
    if (updateId) {
      this.submitUpdatedComment();
    } else {
      this.submitNewComment();
    }
  }

  submitNewComment = () => {
    const { product, detail } = this.state;
    const data = [
      ...this.state.data,
      {
        product,
          detail,
          _id: Date.now().toString(),
          updatedAt: new Date(),
          createdAt: new Date()
      },
    ];
    this.setState({ data });
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, detail }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ product: '', detail: '', error: null });
    });
  }

  submitUpdatedComment = () => {
    const { product, detail, updateId } = this.state;
    fetch(`/api/items/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, detail }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ product: '', detail: '', updateId: null });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="products">
          <h2>Products:</h2>
          <ProductList data={this.state.data} handleDeleteItem={this.onDeleteItem} handleUpdateItem={this.onUpdateItem} />
        </div>
      <div className="form">
        <form onSubmit={this.submitItem}>
          <input
            type="text"
            name="product"
            placeholder="Product..."
            value={this.product}
            onChange={this.onChangeItem}
          />
          <input
            type="text"
            name="detail"
            placeholder="Product Details..."
            value={this.detail}
            onChange={this.onChangeItem}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {this.state.error && <p>{this.state.error}</p>}
    </div>
    );
  }
}

export default Dashboard;