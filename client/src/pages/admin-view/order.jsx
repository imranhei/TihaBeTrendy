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
import { addOrderFormElements } from "@/config";
import {
  addOrder,
  fetchAllOrders,
  updateOrder,
  deleteOrder,
  updateOrderStatus
} from "@/store/admin/order-slice";
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
  // totalPrice: 0,
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

    const token = JSON.parse(sessionStorage.getItem("token"));
    currentEditedId !== null
      ? dispatch(updateOrder({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllOrders(token));
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
            dispatch(fetchAllOrders(token));
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
      if (data?.payload?.success) {
        setIsModalOpen(false);
        dispatch(fetchAllOrders());
        toast({
          title: "Order Deleted Successfully",
        });
      }
    });
  };

  const handleStatusChange = (id) => {
    dispatch(updateOrderStatus(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllOrders());
        toast({
          title: "Order Status Updated Successfully",
        });
      }
    });
  };

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(fetchAllOrders(token));
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <Button
        className="underline-effect overflow-hidden hover:bg-white rounded-sm hover:text-violet-700 shadow-md shadow-violet-300 w-fit p-3 sm:p-4"
        onClick={() => {
          setFormData(initialFormData);
          setIsDialogOpen(true);
        }}
      >
        <CirclePlus size={20} />{" "}
        <p className="sm:ml-2 sm:block hidden">Add New Order</p>
      </Button>

      <AdminOrderTable
        orderList={orderList}
        setCurrentEditedId={setCurrentEditedId}
        setFormData={setFormData}
        setIsDialogOpen={setIsDialogOpen}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        statusField={true}
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

export default AdminOrders;
