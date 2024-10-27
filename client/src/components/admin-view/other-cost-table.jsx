import React, { useState } from 'react'
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

const AdminOtherCostTable = ({
  otherCostList,
  setCurrentEditedId,
  setFormData,
  setIsDialogOpen,
  isModalOpen,
  setIsModalOpen,
  handleDelete,
}) => {
  const [deletedId, setDeletedId] = useState(null);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="p-0 text-nowrap">
            <TableHead>No</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Cause</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-20 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {otherCostList?.map((otherCost, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{otherCost?.amount}</TableCell>
              <TableCell>{otherCost?.title}</TableCell>
              <TableCell className="text-nowrap">{otherCost?.date}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Pencil
                  onClick={() => {
                    setFormData(otherCost);
                    setCurrentEditedId(otherCost?._id);
                    setIsDialogOpen(true);
                  }}
                  size={20}
                  className="text-green-500"
                />
                <Trash2
                  onClick={() => {
                    setIsModalOpen(true);
                    setDeletedId(otherCost?._id);
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
            <TableCell className="py-2" colSpan={8}>
              Orders 1 - {otherCostList?.length > 10 ? "10" : otherCostList?.length} of{" "}
              {otherCostList?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setDeletedId(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this cost? It will update your business financial records.
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
  )
}

export default AdminOtherCostTable
