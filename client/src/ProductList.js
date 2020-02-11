import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const ProductList = (props) => {
  const productNodes = props.data.map(product => (
    <Product product={product.product} key={product._id} timestamp={product.updatedAt} id={product._id} handleUpdateItem={props.handleUpdateItem} handleDeleteItem={props.handleDeleteItem}>
      { product.detail}
    </Product>
  ));
  return (
    <div>
      { productNodes }
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.string,
    detail: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  handleDeleteItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  data: [],
};

export default ProductList;