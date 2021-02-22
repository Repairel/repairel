import PropTypes from 'prop-types';

import {
  ProductInfoList,
  ProductInfoListItem,
  Rating,
  ProductPrice,
} from './ProductInfo.style';
import { ProductSize } from '@components/product/Product.style';

function isAffiliate(link) {
  if (link) {
    if (link.length > 0) {
      return <span>(affiliate product)</span>
    }
  }
  return <span></span>;
}

const ProductInfo = ({ price, name, rating, size, ref_link }) => {
  return (
    <>
      <ProductInfoList>
        <ProductInfoListItem>
          {name} <ProductSize>/ size {size}</ProductSize>
        </ProductInfoListItem>
        <ProductPrice>£ {price} {isAffiliate(ref_link)}</ProductPrice>
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
