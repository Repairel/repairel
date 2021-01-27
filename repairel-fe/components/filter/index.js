import PropTypes from "prop-types";
import React from "react";
import {
  FilterDiv,
  FilterWrapper,
  FilterHeadings,
  FilterInput,
  FilterLabel,
  FilterMessage,
  ClearAll,
} from "./Filter.style";

const Filter = ({ content, list, setFilteredList }) => {
    const [filters, setFilters] = React.useState({
        price: "",
        condition: "",
        AffiliateProduct:"",
        size: [],
        brand: [],

    });
    const [noFilter, setNoFilter] = React.useState(false);;
    const sizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const condition = ["New", "Refurbished"];
    const AffiliateProduct = ["Yes", "No"];
    const price = ["High to Low", "Low to High"];
    let brands2 = [];
    let brands3 = [];
    let b = []; 
    const prodList = list;
    for (b in prodList) {
        if (prodList[b].brand != null) {
            if (prodList[b].brand.Show_Filter_Option) {
                brands2.push(prodList[b].brand.Brand_name);
                brands3.push(prodList[b].brand.Brand_name.replace(/\s+/g, ''));
            }
        }
    }
    const brands = [...new Set(brands2.map(x => x))];
    

  // if there is sessionStorage with filters the correct checkboxes are checked upon filter open
  React.useEffect(() => {
    let checkboxes = document.querySelectorAll("input");
    if (sessionStorage.getItem("filters") !== null) {
      let storedFilters = Object.values(
        JSON.parse(sessionStorage.getItem("filters"))
      );
      let price = storedFilters[0];
      let condition = storedFilters[1];
        let sizes = storedFilters[2];
        let brands = storedFilters[3];
        let AffiliateProduct = storedFilters[4];
      Array.from(checkboxes, (checkbox) => {
          let id = checkbox.id.split(" ").join("").toLowerCase();
        if (id === price) {
          checkbox.checked = true;
        } else if (id === condition) {
          checkbox.checked = true;
        } else if (sizes.includes(id)) {
            checkbox.checked = true;
        } else if (brands.includes(id)) {
              checkbox.checked = true;
        } else if (id === AffiliateProduct) {
              checkbox.checked = true;
          } 
      });
    }
  }, []);

  //checkes whether input change is checking or unchecking and updates filters state accordingly
  const handleChange = (event) => {
    event.target.checked ? handleCheck(event) : handleUncheck(event);
  };

  const handleCheck = (event) => {
      let item = event.target.id.toLowerCase().split(" ").join("");
    if (item.includes("high")) {
      sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, price: item })
      );
      setFilters({ ...filters, price: item });
    } else if (item.includes("new") || item.includes("refurbished")) {
      sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, condition: item })
      );
      setFilters({ ...filters, condition: item });
    } else if (item.includes("yes") || item.includes("no")) {
        sessionStorage.setItem(
            "filters",
            JSON.stringify({ ...filters, AffiliateProduct: item })
        );
        setFilters({ ...filters, AffiliateProduct: item });
    }

    else if (brands3.includes(item)) {
        sessionStorage.setItem(
            "filters",
            JSON.stringify({ ...filters, brand: item })
        );
        setFilters({ ...filters, brand: item });
    } else {
      sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, size: filters.size.concat(item) })
      );
      setFilters({ ...filters, size: filters.size.concat(item) });
      }

  };

  const handleUncheck = (event) => {
    let id = event.target.id;
    const sizes = [...filters.size];
      const index = sizes.indexOf(id);

    if (index > -1) {
      sizes.splice(index, 1);
      }
     
    sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, size: sizes,  })
      );
      setFilters({ ...filters, size: sizes, });
    };
   



  // when filters update i.e. filter inputs are clicked the filter function is triggered to render filtered products
  React.useEffect(() => {
    filterFunction();
  }, [filters]);

  // filters products and sets filteredList to trigger else statement in productList component line 58
  const filterFunction = () => {
    let listCopy = [...list];
    let storageFilters = JSON.parse(sessionStorage.getItem("filters"));
    let filterObj = storageFilters === null ? filters : storageFilters;
      let array = Object.keys(filterObj);
    array.forEach((filter) => {
      if (filter === "price" && filterObj[filter] !== "") {
        filterObj[filter] === "lowtohigh"
          ? (listCopy = [...list].sort((a, b) => (a.price > b.price ? 1 : -1)))
          : (listCopy = [...list].sort((a, b) => (a.price > b.price ? -1 : 1)));
      } else if (filter === "condition" && filterObj[filter] !== "") {
          const newList = [];
          const refurbishedList = [];
          listCopy.map((product) => {
              product.new ? newList.push(product) : refurbishedList.push(product);
          });
          filterObj[filter] === "new"
              ? (listCopy = newList)
              : (listCopy = refurbishedList);
      }

      else if (filter === "AffiliateProduct" && filterObj[filter] !== "") {
          const AFList = [];
          const ALLList = [];
          listCopy.map((product) => {
              product.affiliateProduct ? AFList.push(product) : ALLList.push(product);
          });
          filterObj[filter] === "yes"
              ? (listCopy = AFList)
              : (listCopy = ALLList);
      }
      else if (filter === "size" && filterObj[filter].length !== 0) {
        let sizeArray = [];
        listCopy.map((product) => {
          if (filterObj[filter].includes(product.Size.toString()))
            sizeArray.push(product);
        });
        listCopy = sizeArray;
        }

      else if (filter === "brand" && filterObj[filter].length !== 0) {
          const brandArray = [];
          listCopy.map((product) => {

              if (prodList[b].brand != null) {
                  if (filterObj[filter].includes(product.brand.Brand_name.toString().replace(/\s+/g, '').toLowerCase()))
                      brandArray.push(product);
              }
          });
          listCopy = brandArray;
      }
      listCopy.length === 0 ? setNoFilter(true) : setNoFilter(false);

      setFilteredList(listCopy);
    });
  };

  // resets all state and unchecks checkboxes
  const clearAll = () => {
      setFilters({ price: "", condition: "", size: [], brand: [], AffiliateProduct: "", });
    setFilteredList([]);
    setNoFilter(false);
    sessionStorage.removeItem("filters");
    let checkboxes = document.querySelectorAll("input");
    Array.from(checkboxes, (checkbox) => {
      checkbox.checked = false;
    });
  };

  const renderParams = (arr) => {
    return arr.map((item, index) => {
      return (
        <React.Fragment key={(item, index)}>
          <FilterInput
            type={typeof item === "number" ? "checkbox" : "radio"}
            name={
              typeof item === "number"
                ? item
                : item.includes("to")
                ? "price"
                : "condition"
            }
            id={item}
            onChange={(event) => handleChange(event)}
          ></FilterInput>
          <FilterLabel htmlFor={item}>{item}</FilterLabel>
        </React.Fragment>
      );
    });
  };
  return (
    <FilterWrapper>
      <>
        <FilterHeadings>Price</FilterHeadings>
        <FilterDiv>{renderParams(price)}</FilterDiv>
      </>
      <div >
        <FilterHeadings>Condition</FilterHeadings>
        <FilterDiv>{renderParams(condition)}</FilterDiv>
          </div>
          <div >
      <FilterHeadings>Size</FilterHeadings>
              <FilterDiv>{renderParams(sizes)}</FilterDiv>
          </div>
          <div >
          <FilterHeadings>Brand</FilterHeadings>
              <FilterDiv >{renderParams(brands)}</FilterDiv>
          </div>
          <div >
          <FilterHeadings>Affiliate Product</FilterHeadings>
              <FilterDiv >{renderParams(AffiliateProduct)}</FilterDiv>
              </div>
      {noFilter && (
        <FilterMessage>
          {"We're sorry, there are no products that match these filters. Don't worry we have many more shoes to choose from."}
        </FilterMessage>
      )}
          <ClearAll onClick={() => clearAll()}>Clear all</ClearAll>

    </FilterWrapper>
  );
};

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brandc`);
    const json = await res.json();
    return { props: { list: json } };
}

Filter.propTypes = {

  list: PropTypes.array,
  setFilteredList: PropTypes.func,
  
};

export default Filter;
