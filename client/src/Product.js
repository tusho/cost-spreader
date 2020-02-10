import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Product = props => (
  <div className="singleProduct">
    <img alt="product_image" className="productImage" src={`https://picsum.photos/70?random=${props.id}`} />
    <div className="textContent">
      <div className="singleProductContent">
        <h3>{props.product}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleProductButtons">
        <a href="/#" onClick={() => { props.handleUpdateItem(props.id); }}>update</a>
        <a href="/#" onClick={() => { props.handleDeleteItem(props.id); }}>delete</a>
      </div>
    </div>
  </div>
);

Product.propTypes = {
  product: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Product;