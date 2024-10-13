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
    <Card className="w-72 overflow-hidden h-[400px] shadow-md hover:-mt-4 transition-all ease duration-300">
      <div>
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="space-y-1 mt-2 pb-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <h2>{product?.title}</h2>
            <h2>{product?.productId}</h2>
          </div>
          <div className="flex justify-between items-center">
            <span>Category : {product?.category}</span>
            <span>Stock : {product?.stock}</span>
          </div>
          <div className="flex justify-between items-center  text-primary">
            <span>Price : ${product?.price}</span>
            <span>Purchase Price : ${product?.purchasePrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>
              Purchase Date :{" "}
              {new Date(product?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
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
      </div>
    </Card>
  );
};

export default AdminProductTile;
