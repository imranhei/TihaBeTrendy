import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSales,
  updateSale,
  deleteSale,
} from "@/store/admin/sale-slice";
import { useToast } from "../../hooks/use-toast";
import AdminOrderTable from "@/components/admin-view/order-table";
import { CirclePlus } from "lucide-react";
import OrderUpdateForm from "@/components/admin-view/order-update-form";

const initialFormData = {
  orderId: "",
  customer: {
    id: "",
    name: "",
    phone: "",
    address: "",
  },
  productId: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
  date: "",
};

const SalesHistory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { salesList, isLoading } = useSelector((state) => state.adminSales);
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(updateSale({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllSales());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Sales Updated Successfully",
              });
            }
          }
        )
      : null;
  };

  const handleDelete = (id) => {
    dispatch(deleteSale(id)).then((data) => {
      if (data?.payload?.success) {
        setIsModalOpen(false);
        dispatch(fetchAllSales());
        toast({
          title: "Sale Deleted Successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllSales());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <h1 className="text-center sm:text-3xl text-xl text-muted-foreground font-bold">Sales History</h1>
      <AdminOrderTable
        orderList={salesList}
        setCurrentEditedId={setCurrentEditedId}
        setFormData={setFormData}
        setIsDialogOpen={setIsDialogOpen}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}
        statusField={false}
        deleteText="It will update your product stock."
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(false);
          setCurrentEditedId(null);
        }}
      >
        <DialogContent className="lg:max-w-[800px] sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl">
              {currentEditedId !== null ? "Edit Sale" : null}
            </DialogTitle>
            <DialogDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <OrderUpdateForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              loadingText={
                currentEditedId !== null ? "Updating..." : "Adding..."
              }
              isButtonDisable={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesHistory;
