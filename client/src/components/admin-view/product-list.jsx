import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminProductList = ({
  productList,
  setCurrentEditedId,
  setFormData,
  handleDelete,
  setIsDialogOpen,
  setIsModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}) => {
  const [deletedId, setDeletedId] = useState(null);

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
            <TableRow key={product?.productId} className="text-nowrap">
              <TableCell className="h-12 min-w-20 w-fit p-1">
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
              <TableCell>
                {(
                  ((product?.price - product?.unitPurchaseCost) /
                    product?.price) *
                  100
                ).toFixed(2)}
                % <ArrowUp size={16} className="text-green-500 inline-block mb-1" />
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
              <TableCell className="flex gap-2 justify-center min-w-16 items-center sm:mt-1 mt-2">
                <Eye
                  onClick={() => {
                    setIsModalOpen(true);
                    setCurrentEditedId(product?._id);
                  }}
                  size={20}
                  className="text-blue-500 cursor-pointer"
                />
                <Pencil
                  className="text-green-500 cursor-pointer"
                  size={20}
                  onClick={() => {
                    setFormData(product);
                    setCurrentEditedId(product?._id);
                    setIsDialogOpen(true);
                  }}
                />
                <Trash2
                  className="text-red-500 cursor-pointer"
                  size={20}
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setDeletedId(product._id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={11} className="text-right py-2">
              Showing {productList.length} products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={() => {
          setIsDeleteModalOpen(false);
          setDeletedId(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Product? It will update your
              business financial records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row flex-wrap justify-center sm:gap-6 gap-4">
            <DialogClose asChild className="sm:w-32 w-24">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              className="sm:w-32 w-24"
              onClick={() => handleDelete(deletedId)}
              type="button"
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductList;
