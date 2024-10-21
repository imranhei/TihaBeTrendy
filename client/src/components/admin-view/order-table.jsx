import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const AdminOrderTable = ({
  orderList,
  setCurrentEditedId,
  setFormData,
  setIsDialogOpen,
  setIsModalOpen,
  isModalOpen,
  handleDelete
}) => {
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="bg-white flex-1 sm:p-6 p-4 shadow-md rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="p-0 text-nowrap">
            <TableHead>Product Id</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-40 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList?.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order?.productId}</TableCell>
              <TableCell>{order?.quantity}</TableCell>
              <TableCell>{order?.price}</TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell className="text-nowrap">{order?.date}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Pencil
                  onClick={() => {
                    setFormData(order);
                    setCurrentEditedId(order?._id);
                    setIsDialogOpen(true);
                  }}
                  size={20}
                  className="text-green-500"
                />
                <Trash2
                  onClick={() => {
                    setIsModalOpen(true);
                    setDeleteId(order?._id);
                  }}
                  size={20}
                  className="text-red-500"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="py-4" colSpan={3}>
              Total
            </TableCell>
            <TableCell className="py-4" colSpan={3}>
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setDeleteId(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row flex-wrap justify-center sm:gap-6 gap-4">
            <DialogClose asChild className="sm:w-32 w-24">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button className="sm:w-32 w-24" onClick={() => handleDelete(deleteId)} type="button" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrderTable;
