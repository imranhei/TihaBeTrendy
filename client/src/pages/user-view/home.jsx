import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/user/product-slice";
import UserProductTile from "@/components/user-view/product-tile";
import ProductFilter from "@/components/user-view/product-filter";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.userProducts);
  const categorySearchParam = searchParams.get("category");

  const createSearchParamHelper = (filterParams) => {
    if (Array.isArray(filterParams) && filterParams.length > 0) {
      const paramValue = filterParams.join(",");
      return `category=${encodeURIComponent(paramValue)}`;
    }

    return "";
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (category) => {
    let tempFilter = [...filters];
    if (tempFilter.includes(category)) {
      tempFilter = tempFilter.filter((item) => item !== category);
    } else {
      tempFilter.push(category);
    }
    setFilters(tempFilter);
    sessionStorage.setItem("filters", JSON.stringify(tempFilter));
  };

  useEffect(() => {
    if (filters) {
      const createQuesryString = createSearchParamHelper(filters);
      setSearchParams(new URLSearchParams(createQuesryString));
    }
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    setFilters(Array.isArray(savedFilters) ? savedFilters : []);
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  return (
    <div className="min-h-screen">
      <h1 className="flex-1 text-center sm:py-10 py-4 sm:text-4xl text-xl font-bold text-muted-foreground">
        Welcome to TiHa-be trendy
      </h1>
      <hr />
      <div className="flex md:flex-row flex-col gap-6 p-4 md:p-6">
        <ProductFilter
          handleFilter={handleFilter}
          filters={filters}
          sort={sort}
          handleSort={handleSort}
        />
        <div className="flex flex-1 flex-wrap justify-center gap-6 sm:p-6 p-4 bg-background rounded-lg shadow">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <UserProductTile key={product._id} product={product} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
