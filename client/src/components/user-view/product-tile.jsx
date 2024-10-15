import React from 'react'
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart } from 'lucide-react';

const UserProductTile = ({ product }) => {
  return (
    <Card className="w-72 overflow-hidden sm:h-[370px] shadow-md sm:hover:-mt-4 transition-all ease duration-300 relative">
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
            {/* <h2>{product?.productId}</h2> */}
          </div>
          <div className="flex sm:text-base text-sm justify-between items-center">
            <span>Category : {product?.category}</span>
            {/* <span>Stock : {product?.stock}</span> */}
          </div>
          <div className="flex justify-between items-center sm:text-base text-sm">
            <span>Price : ${product?.price}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center absolute bottom-0 w-full">
          <Button
          >
            <ShoppingCart size={20} className='mr-2' /> Add to cart
          </Button>
        </CardFooter>
    </Card>
  )
}

export default UserProductTile;
