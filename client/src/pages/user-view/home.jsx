import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/user/product-slice";
import UserProductTile from "@/components/user-view/product-tile";

const Home = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.userProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <div>
      <h1 className="flex-1 text-center sm:py-10 py-4 sm:text-4xl text-xl font-bold text-muted-foreground">
        Welcome to TiHa-be-trendy
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <UserProductTile key={product._id} product={product} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
