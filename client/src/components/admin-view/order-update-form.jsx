import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RotateCw } from "lucide-react";
import { addOrderFormElements } from "@/config";

const OrderUpdateForm = ({
  onSubmit,
  formData,
  setFormData,
  buttonText,
  loadingText,
  isButtonDisable,
}) => {
  const { isLoading } = useSelector((state) => state.adminOrders);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("customer.")) {
      const fieldName = name.split(".")[1];

      setFormData({
        ...formData,
        customer: {
          ...formData.customer,
          [fieldName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Order ID</Label>
            <Input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              placeholder="Enter Order ID"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Customer ID</Label>
            <Input
              type="text"
              name="customer.id"
              value={formData.customer.id}
              onChange={handleInputChange}
              placeholder="Enter Customer ID"
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Customer Name</Label>
            <Input
              type="text"
              name="customer.name"
              value={formData.customer.name}
              onChange={handleInputChange}
              placeholder="Enter Customer Name"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Customer Phone</Label>
            <Input
              type="text"
              name="customer.phone"
              value={formData.customer.phone}
              onChange={handleInputChange}
              placeholder="Enter Customer Phone"
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Customer Address</Label>
            <Input
              type="text"
              name="customer.address"
              value={formData.customer.address}
              onChange={handleInputChange}
              placeholder="Enter Customer Address"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>
              Product ID <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              placeholder="Enter Product ID"
              required
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>
              Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter Quantity"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>
              Unit Price <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              placeholder="Unit Price"
              required
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>
              Total Amount
            </Label>
            <Label className="border rounded-md h-10 p-2 flex items-center font-normal">
              {formData.quantity * formData.unitPrice}
            </Label>
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Enter Date"
            />
          </div>
        </div>
      </div>
      {!isLoading ? (
        <Button
          disabled={isButtonDisable}
          type="submit"
          className="mt-4 w-full"
        >
          {buttonText || "Submit"}
        </Button>
      ) : (
        <Button disabled className="mt-4 w-full">
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Submitting..."}
        </Button>
      )}
    </form>
  );
};

export default OrderUpdateForm;
