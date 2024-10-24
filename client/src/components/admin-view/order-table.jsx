import React, { useState } from "react";
import { Eye, Pencil, Trash2, Truck } from "lucide-react";
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
  handleDelete,
  handleStatusChange,
  statusField
}) => {
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="bg-white flex-1 sm:p-6 p-4 shadow-md rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="p-0 text-nowrap">
            <TableHead>Product Id</TableHead>
            <TableHead>Order Id</TableHead>
            {/* <TableHead>Customer Name</TableHead> */}
            {/* <TableHead>Unit Price</TableHead> */}
            <TableHead>Total Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            {statusField && <TableHead className="w-20 text-center">Status</TableHead>}
            <TableHead className="w-20 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList?.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order?.productId}</TableCell>
              <TableCell>{order?.orderId}</TableCell>
              {/* <TableCell>{order?.customer?.name}</TableCell> */}
              {/* <TableCell>{order?.unitPrice}</TableCell> */}
              <TableCell>{order?.unitPrice * order?.quantity}</TableCell>
              <TableCell>{order?.quantity}</TableCell>
              <TableCell className="text-nowrap">{order?.date}</TableCell>
              <TableCell className="!p-1">
                <Button onClick={() => handleStatusChange(order?._id)} className="gap-2"><Truck size={20} /> Delivered</Button>
              </TableCell>
              <TableCell className="flex justify-center gap-2 mt-1">
                <Eye size={20} className="text-blue-500" />
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
            <TableCell className="py-4" colSpan={8}>
              Orders 1 - {orderList?.length > 10 ? "10" : orderList?.length} of {orderList?.length}
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
              Are you sure you want to delete this? It will update your product stock.
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
