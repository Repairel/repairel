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
        size: "",
        brand: "",

    });
    const [noFilter, setNoFilter] = React.useState(false);;
    const sizes = ['all sizes','kids', "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    const condition = ["all conditions", "New", "Refurbished"];
    const price = ["High to Low", "Low to High"];
    let brands2 = ["all brands"];
    let brands3 = [""];
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
        Array.from(checkboxes, (checkbox) => {
              let id = checkbox.id.split(" ").join("").toLowerCase();
            if (id === price) {
              checkbox.checked = true;
            } else if (id === condition) {
              checkbox.checked = true;

            }

            else if (sizes.includes(id)) {
                checkbox.checked = true;
            } else if (id === brands) {
                  checkbox.checked = true;
            }
          });
        }
      }, []);


  //checks whether input change is checking or unchecking and updates filters state accordingly
  const handleChange = (event) => {
    event.target.checked ? handleCheck(event) : handleUncheck(event);

  };

  const handleCheck = (event) => {
      let item = event.target.id.toLowerCase().split(" ").join("").replace("shoes","");
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
    }else if (item.includes("kids")) {
      item="0"
      sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, size: item })
      );
      setFilters({ ...filters, size: item });

    } else if (brands3.includes(item)) {
        sessionStorage.setItem(
            "filters",
            JSON.stringify({ ...filters, brand: item })
        );
        setFilters({ ...filters, brand: item });
}

    else if (item.includes("allbrands"))  {
	item="";
      sessionStorage.setItem(
        "filters",

        JSON.stringify({ ...filters, brand: item })
      );
      setFilters({ ...filters, brand: item });
    }

    else if (item.includes("allconditions"))  {
  item="";
      sessionStorage.setItem(
        "filters",

        JSON.stringify({ ...filters, condition: item })
      );
      setFilters({ ...filters, condition: item });
    }
    else if (item.includes("allsizes"))  {
  item="";
      sessionStorage.setItem(
        "filters",

        JSON.stringify({ ...filters, size: item })
      );
      setFilters({ ...filters, size: item });
    }
   else {

      sessionStorage.setItem(
        "filters",
        JSON.stringify({ ...filters, size: item })
      );
      setFilters({ ...filters, size: item });
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
      }
      else if (filter === "condition" && filterObj[filter] !== "") {
          const newList = [];
          const refurbishedList = [];
          listCopy.map((product) => {
              product.new ? newList.push(product) : refurbishedList.push(product);
          });
          filterObj[filter] === "new"
              ? (listCopy = newList)
              : (listCopy = refurbishedList);}

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
      setFilters({ price: "", condition: "", size: [], brand: "", });
    setFilteredList([]);
    setNoFilter(false);
    sessionStorage.removeItem("filters");
    let checkboxes = document.querySelectorAll("input");
    Array.from(checkboxes, (checkbox) => {
      checkbox.checked = false;
    });
  };

  const renderParams = (arr) => {
    console.log(filters)
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
                : item.includes("Shoes")
                ? "condition"
                : item.includes("New")
                ? "condition"
                : item.includes("Refurbished")
                ? "condition"
                : item.includes("kids")
                ? "size"
                : item.includes("all brands")
                ? "brand"
                : item.includes("all conditions")
                ? "condition"
                : item.includes("all sizes")
                ? "size"
                : item.length <= 2
                ? "size"
                : "brand"


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
      {noFilter && (
        <FilterMessage>
          {"We're sorry, there are no products that match these filters. Please try again using different filters."}
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
