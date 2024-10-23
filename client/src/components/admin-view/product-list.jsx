import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const AdminProductList = ({
  productList,
  setCurrentEditedId,
  setFormData,
  handleDelete,
  setIsDialogOpen,
}) => {
  return (
    <div className="bg-white flex-1 overflow-x-auto shadow-md rounded-lg sm:p-6 p-4">
      <Table>
        <TableHeader>
          <TableRow className="text-nowrap">
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Product Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>Unit Cost</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>P. Date</TableHead>
            <TableHead className="text-center min-w-16">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product?.productId}>
              <TableCell className="h-12 w-fit p-1">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
              </TableCell>
              <TableCell>{product?.productId}</TableCell>
              <TableCell>{product?.title}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell className="flex items-center gap-1">
                {(
                  ((product?.price - product?.unitPurchaseCost) /
                    product?.price) *
                  100
                ).toFixed(2)}
                % <ArrowUp size={16} className="text-green-500" />
              </TableCell>
              <TableCell>{product?.unitPurchaseCost}</TableCell>
              <TableCell>{product?.totalPurchaseCost}</TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>
                {new Date(product?.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="flex gap-2 justify-center min-w-16 items-center mt-1">
                <Pencil
                  className="text-green-500"
                  size={20}
                  onClick={() => {
                    setFormData(product);
                    setCurrentEditedId(product?._id);
                    setIsDialogOpen(true);
                  }}
                />
                <Trash2
                  className="text-red-500"
                  size={20}
                  onClick={() => handleDelete(product._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} className="text-right">
              Showing {productList.length} products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AdminProductList;
