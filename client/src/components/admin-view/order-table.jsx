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
  statusField,
  deleteText = "",
}) => {
  const [modalType, setModalType] = useState(""); // New state for modal type
  const [modalText, setModalText] = useState("");
  const [actionId, setActionId] = useState(null);

  const handleOpenModal = (type, id, text) => {
    setModalType(type);
    setActionId(id);
    setModalText(text);
    setIsModalOpen(true);
  };

  const handleModalAction = () => {
    if (modalType === "delete") {
      handleDelete(actionId);
    } else if (modalType === "statusChange") {
      handleStatusChange(actionId);
    }
    setIsModalOpen(false);
  };

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
            {statusField && (
              <TableHead className="min-w-20 text-center">Status</TableHead>
            )}
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
              {statusField && (
                <TableCell className="!p-1 group">
                  <Button
                     onClick={() =>
                      handleOpenModal("statusChange", order?._id, "Are you sure you want to mark this as Delivered?")
                    }
                    className="gap-2 text-xs flex items-center transition-transform duration-300 mx-auto"
                    size="xs"
                  >
                    <Truck
                      size={16}
                      className="transform transition-transform ease-in-out duration-500 group-hover:translate-x-[60px]"
                    />
                    <span className="transform transition-transform duration-300 group-hover:-translate-x-6">
                      Delivered
                    </span>
                  </Button>
                </TableCell>
              )}
              <TableCell className="flex justify-center gap-2 sm:mt-0 mt-1">
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
                  onClick={() =>
                    handleOpenModal("delete", order?._id, "Are you sure you want to delete this order?")
                  }
                  size={20}
                  className="text-red-500"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="py-2" colSpan={8}>
              Orders 1 - {orderList?.length > 10 ? "10" : orderList?.length} of{" "}
              {orderList?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      
      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setActionId(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{modalType === "delete" ? "Confirm Delete?" : "Confirm Status Change"}</DialogTitle>
            <DialogDescription>
              {modalText} {deleteText}
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
              onClick={handleModalAction}
              type="button"
              variant="destructive"
            >
              {modalType === "delete" ? "Delete" : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrderTable;
