import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addOrderFormElements } from "@/config";
import {
  addOrder,
  fetchAllOrders,
  updateOrder,
  deleteOrder
} from "@/store/admin/order-slice";
import { useToast } from "../../hooks/use-toast";
import CommonForm from "@/components/common/form";
import AdminOrderTable from "@/components/admin-view/order-table";

const initialFormData = {
  productId: "",
  quantity: "",
  price: "",
  date: "",
};

const AdminOrders = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrders);
  const { toast } = useToast();

  // console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(updateOrder({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllOrders());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Order Updated Successfully",
              });
            }
          }
        )
      : dispatch(addOrder(formData)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllOrders());
            setFormData(initialFormData);
            toast({
              title: "Order Added Successfully",
            });
          } else {
            toast({
              title: data?.payload?.message,
            });
          }
        });
  };

  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then((data) => {
      if (data.payload?.success) {
        setIsModalOpen(false);
        dispatch(fetchAllOrders());
        toast({
          title: "Order Deleted Successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <Button
        className="underline-effect overflow-hidden hover:bg-white rounded-sm hover:text-violet-700 shadow-md shadow-violet-300 w-40"
        onClick={() => {
          setFormData(initialFormData);
          setIsDialogOpen(true);
        }}
      >
        Add New Order
      </Button>

      <AdminOrderTable 
        orderList={orderList}
        setCurrentEditedId={setCurrentEditedId}
        setFormData={setFormData}
        setIsDialogOpen={setIsDialogOpen}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}
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
              {currentEditedId !== null ? "Edit Order" : "Add New Order"}
            </DialogTitle>
            <DialogDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addOrderFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              // isButtonDisable={!isFormValid()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
