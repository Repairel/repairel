import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { LinedHeading, StyledLink } from "../../styles/global";
import {
  ProductCard,
  ProductImage,
  ProductInfoWrapper,
  OptionsItem,
  OptionsList,
  SoldOutWrapper,
  ImageWrapper,
  InfiniteScrollStyled,
  Checkbox,
  StyledInput,
  StyledLabel,
} from "./ProductList.style";

import ProductInfo from "@components/productInfo";
import Filter from "@components/filter";
import CompareInstructions from "@components/compareInstructions";

const ProductList = ({ list }) => {
  // the list comes from the fetch request in '../../pages/index'
  //and contains all of the products
  const router = useRouter();
  const [products, setProducts] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  let [count, setCount] = React.useState(0);
  const [toggleFilter, setToggleFilter] = React.useState(false);
  const [toggleCompare, setToggleCompare] = React.useState(false);
  const [compareArray, setCompareArray] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);
  const empty = [];
  //this useEffect checks session storage for filters and opens the filter if there is
  React.useEffect(() => {
    const filters = sessionStorage.getItem("filters");
    if (filters !== null) setToggleFilter(true);
  }, []);

  // This useEffect checks to see wether to render from list or filteredList

  // Products state was required for the infinte scroll but when it is filteredList it does not work

  // The count state is used to dictate when more products should be added from list and
  // rendered for the infinte scroll
  React.useEffect(() => {
    let productArray = [];
    if (filteredList.length === 0 && !toggleFilter ){
      for (var i = count; i < count + 50; i++) {
        if (i >= list.length) {
          setHasMore(false);
        } else {
          productArray.push(list[i]);
          setProducts(productArray);
        }
      }
    }
    else if(filteredList.length === 0 && toggleFilter === true ){
   	setProducts(empty)
}
 else {
      for (var j = count; j < count + 50; j++) {
        if (j >= filteredList.length) {
          setHasMore(false);
        } else {
          productArray.push(filteredList[j]);
          setProducts(productArray);
        }
      }
    }
  }, [count, filteredList]);

  const handleChange = (event) => {
    let id = event.target.id - 100;
    let checked = event.target.checked;
    if (checked === false) {
      const index = compareArray.indexOf(id);
      if (index > -1) {
        compareArray.splice(index, 1);
      }
    } else {
      if (compareArray.length < 2) {
        let newCompare = compareArray.concat(id);
        setCompareArray(newCompare);
      }
      return;
    }
  };

  React.useEffect(() => {
    if (compareArray.length === 2) {
      const href = "/compare/[id1]/[id2]";
      const as = `/compare/${compareArray[0]}/${compareArray[1]}`;

      router.push(href, as);
    }
  }, [compareArray]);

  const handleFilterClick = () => {
    setToggleCompare(false);
    setToggleFilter(!toggleFilter);
  };
  const handleCompareClick = () => {
    setToggleFilter(false);
    setToggleCompare(!toggleCompare);
  };

  // renders a different product card depending on stock status
  const productRender = (products) => {
    return products.map((product) => {


      if (product.stock) {
        return (

          <ProductCard key={product.id}>
            <Link href={`/product/[id]`} as={`/product/${product.id}`}>
              <div style={{ cursor: "pointer", width: "100%" }}>
                <ImageWrapper>
                  <ProductImage
                    loading="lazy"
                    key={product.id}
                    stock={product.stock}
                    src={product.images[0].url}
                  />
                </ImageWrapper>
                <ProductInfoWrapper>
                  <ProductInfo
                    key={product.id}
                    price={product.price}
                    name={product.name}

                    size={product.Size}
                    kSize={product.kidsSize}
                    ref_link={product.affiliate_link}
                  />
                </ProductInfoWrapper>
              </div>
            </Link>
            <Checkbox toggleCompare={toggleCompare}>
              <StyledInput
                onChange={(event) => handleChange(event)}
                type="checkbox"
                id={product.id + 100}
                name={product.name}
              />
              <StyledLabel htmlFor={product.name}>Compare</StyledLabel>
            </Checkbox>
          </ProductCard>
        );
      } else {
        return (
          <Link
            key={product.id}
            href={`/product/[id]`}
            as={`/product/${product.id}`}
          >
            <ProductCard key={product.id} style={{ cursor: "pointer" }}>
              <ImageWrapper>
                <ProductImage
                  loading="lazy"
                  key={product.id}
                  src={product.images[0].url}
                />
                <SoldOutWrapper>
                  Sold
                  <br /> Out
                </SoldOutWrapper>
              </ImageWrapper>
              <ProductInfoWrapper>
                <ProductInfo
                  key={product.id}
                  price={product.price}
                  name={product.name}
                  size={product.Size}
                  kidsSize={product.kidsSize}
                  ref_link={product.affiliate_link}
                />
              </ProductInfoWrapper>
            </ProductCard>
          </Link>
        );
      }
    });
  };

  // Filter component contains more logic necessary for understanding this page
  return (
    products.length >= 0 && (
      <section>
        {!router.pathname.toLowerCase().includes("wishlist") && 
        <OptionsList>
           <OptionsItem
            onClick={() => handleFilterClick()}
            style={
              toggleFilter
                ? { textDecoration: "underline", cursor: "pointer" }
                : { textDecoration: "none", cursor: "pointer" }
            }
          > 
            Filter
          </OptionsItem>
          <OptionsItem
            onClick={() => handleCompareClick()}
            style={
              toggleCompare
                ? { textDecoration: "underline", cursor: "pointer" }
                : { textDecoration: "none", cursor: "pointer" }
            }
          >
            Compare
          </OptionsItem>
        </OptionsList>
        }
        {router.pathname.toLowerCase().includes("wishlist") && 
        <LinedHeading>WISHLIST</LinedHeading>
        }
        {toggleFilter && (
          <Filter setFilteredList={setFilteredList} list={list} />
        )}
        {toggleCompare && <CompareInstructions />}
        <InfiniteScrollStyled
          dataLength={products.length}
          next={() => setCount((count += 50))}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {productRender(products)}
        </InfiniteScrollStyled>
      </section>
    )
  );
};

ProductList.propTypes = {
  list: PropTypes.array,
};

export default ProductList;
