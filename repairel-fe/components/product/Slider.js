import PropTypes from 'prop-types';

import { SliderImage, SliderContainer } from './Product.style'

const Slider = ({ images }) => {
  const slider = images.map((item) => {
    return (
      <SliderImage
        src={item.url}
        alt={item.alternativeText}
        key={item.id}
      />
    );
  });
  return <SliderContainer>{slider}</SliderContainer>;
};

Slider.propTypes = {
  images: PropTypes.array,
};

export default Slider;
