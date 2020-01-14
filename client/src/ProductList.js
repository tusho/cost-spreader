import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const ProductList = (props) => {
  const productNodes = props.data.map(product => (
    <Product product={product.product} key={product._id} id={product._id}>
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
  })),
};

ProductList.defaultProps = {
  data: [],
};

export default ProductList;