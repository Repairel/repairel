import _ from "lodash";
import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import {
  ComparisonHeader,
  ComparisonGrid,
  Image,
  Circle,
  CircleDiv,
  EthicsIcon,
  ArrowIcon,
  ProductInfo,
} from "@components/compare/Compare.style";
import { Rating } from "@components/productInfo/ProductInfo.style";

import Leaf from "../../public/leaf.svg";
import Material from "../../public/material.svg";
import materialProcessing from "../../public/material-processing.svg";
import Manufacturing from "../../public/manufacturing.svg";
import Assembly from "../../public/assembly.svg";
import Use from "../../public/use.svg";
import Disposal from "../../public/disposal.svg";
import Arrow from "../../public/arrow.svg";

const Compare = ({ product1, product2 }) => {
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    setLength(Object.keys(product1.ethics_and_sustainability).length - 1);
  }, []);

  const handleCircles = (int) => {
    let array = [];
    _.times(int, (i) => {
      array.push(<Circle int={int} key={i} />);
    });
    return array;
  };

  const renderRow = (product1, icon, product2, arrow) => {
    let iconKey = Object.keys(icons).find(key => icons[key] === icon);
    let iconName = iconKey.charAt(0).toUpperCase() + iconKey.slice(1).split('_').join(' ')
    return (
      <React.Fragment key={Math.random()}>
        <CircleDiv int={product1}>{handleCircles(product1)}</CircleDiv>
        <div>
          <EthicsIcon title={iconName} src={icon} />
          {arrow && <ArrowIcon src={Arrow} />}
        </div>
        <CircleDiv
          int={product2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {handleCircles(product2)}
        </CircleDiv>
      </React.Fragment>
    );
  };
  const icons = {
    material: Material,
    material_processing: materialProcessing,
    manufacturing: Manufacturing,
    footwear_manufacturing: Leaf,
    assembly: Assembly,
    use: Use,
    disposal: Disposal,
  };
  // list of categories
  const categories = Object.keys(product1.ethics_and_sustainability);
  const row = [];
  // iterate over cathegories but leave out the first (id) and the last
  for (let category of categories.slice(1, -1)) {
    row.push([
      product1.ethics_and_sustainability[category],
      icons[category] || Leaf,
      product2.ethics_and_sustainability[category],
      Arrow,
    ]);
  }
  // for the last category we do the same but without the arrow icon
  const lastCategory = categories[categories.length - 1];
  row.push([
    product1.ethics_and_sustainability[lastCategory],
    icons[lastCategory] || Leaf,
    product2.ethics_and_sustainability[lastCategory],
  ]);
  return (
    <>
      <ComparisonHeader>
        <Link href={`/product/[id]`} as={`/product/${product1.id}`}>
          <Image
            src={product1.images[0].url}
            alt={product1.images[0].alternativeText}
          ></Image>
        </Link>
        <Link href={`/product/[id]`} as={`/product/${product2.id}`}>
          <Image
            src={product2.images[0].url}
            alt={product2.images[0].alternativeText}
          ></Image>
        </Link>
        <ProductInfo>
          <p>
            {product1.name} / size {product1.Size}
          </p>
          <Rating rating={product1.rating} title="Overall ethics rating">{product1.rating}</Rating>
        </ProductInfo>
        <ProductInfo>
          <p>
            {product2.name} / size {product2.Size}
          </p>
          <Rating rating={product2.rating} title="Overall ethics rating">{product2.rating}</Rating>
        </ProductInfo>
      </ComparisonHeader>
      {length !== 0 && (
        <ComparisonGrid length={length}>
          {row.map((item) => {
            return renderRow(...item);
          })}
        </ComparisonGrid>
      )}
    </>
  );
};

Compare.propTypes = {
  product1: PropTypes.object,
  product2: PropTypes.object,
};

export default Compare;
