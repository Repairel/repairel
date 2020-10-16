import PropTypes from 'prop-types';

import {
  ProductInfoList,
  ProductInfoListItem,
  Rating,
  ProductPrice,
} from './ProductInfo.style';
import { ProductSize } from '@components/product/Product.style';

const ProductInfo = ({ price, name, rating, size }) => {
  return (
    <>
      <ProductInfoList>
        <ProductInfoListItem>
          {name} <ProductSize>/ size {size}</ProductSize>
        </ProductInfoListItem>
        <ProductPrice>£ {price}</ProductPrice>
      </ProductInfoList>
      <Rating rating={rating}>{rating}</Rating>
    </>
  );
};

ProductInfo.propTypes = {
  price: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  size: PropTypes.number,
};

export default ProductInfo;
