import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setFormData,
  handleDelete,
  setIsDialogOpen,
  setIsModalOpen,
}) => {
  const [deletedId, setDeletedId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div>
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
        <CardFooter className="flex justify-end gap-2 items-center absolute bottom-0 w-full">
          <Eye
            onClick={() => {
              setIsModalOpen(true);
              setCurrentEditedId(product?._id);
            }}
            size={20}
            className="text-blue-500 cursor-pointer"
          />
          <Separator orientation="vertical" className="h-6" />
          <Pencil
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product?._id);
              setIsDialogOpen(true);
            }}
            className="cursor-pointer text-green-500"
            size={20}
          >
            Edit
          </Pencil>
          <Separator orientation="vertical" className="h-6" />
          <Trash2
            onClick={() => {
              setIsDeleteModalOpen(true);
              setDeletedId(product._id);
            }}
            className="cursor-pointer text-red-500"
            size={20}
          >
            Delete
          </Trash2>
        </CardFooter>
      </Card>

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

export default AdminProductTile;
