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
        <a onClick={() => { props.handleUpdateProduct(props.id); }}>update</a>
        <a onClick={() => { props.handleDeleteProduct(props.id); }}>delete</a>
      </div>
    </div>
  </div>
);

Product.propTypes = {
  product: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Product;