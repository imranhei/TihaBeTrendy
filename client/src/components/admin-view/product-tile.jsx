import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setFormData,
  handleDelete,
  setIsDialogOpen,
}) => {
  return (
    <Card className="w-80 overflow-hidden sm:h-[400px] h-96 shadow-md sm:hover:-mt-4 transition-all ease duration-300 relative">
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="space-y-1 mt-2">
          <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
            <h2>{product?.title}</h2>
            <h2>{product?.productId}</h2>
          </div>
          <div className="flex sm:text-base text-sm justify-between items-center">
            <span>Category : {product?.category}</span>
            <span>Price : {product?.price}</span>
          </div>
          <div className="flex justify-between items-center sm:text-base text-sm">
            <span>Unit Cost : ${product?.unitPurchaseCost}</span>
            <span>Total Cost : ${product?.totalPurchaseCost}</span>
          </div>
          <div className="flex justify-between sm:text-base text-sm">
            <span>
              P. Date :{" "}
              {new Date(product?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span>Stock : {product?.stock}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center absolute bottom-0 w-full">
          <Button
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product?._id);
              setIsDialogOpen(true);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product._id)}>Delete</Button>
        </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
