import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RotateCw } from "lucide-react";

const options = [
  { id: "bag", label: "Bag" },
  { id: "sunglass", label: "Sunglass" },
  { id: "bracelet", label: "Bracelet" },
  { id: "earring", label: "Earring" },
  { id: "hairband", label: "Hairband" },
  { id: "hariclip", label: "Hair Clip" },
  { id: "hairbow", label: "Hair Bow" },
  { id: "headband", label: "Headband" },
  { id: "socks", label: "Socks" },
];

const ProductUpdateForm = ({
  onSubmit,
  formData,
  setFormData,
  buttonText,
  loadingText,
  isButtonDisable,
}) => {
  //   const [hasVariants, setHasVariants] = useState(false);
  const { isLoading } = useSelector((state) => state.adminProducts);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleVariantChange = (index, e) => {
  //     const updatedVariants = [...formData.variants];
  //     updatedVariants[index][e.target.name] = e.target.value;
  //     setFormData({
  //       ...formData,
  //       variants: updatedVariants,
  //     });
  //   };

  //   const addVariant = () => {
  //     setFormData({
  //       ...formData,
  //       variants: [...formData.variants, { color: "", size: "", stock: 0 }],
  //     });
  //   };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Product Id</Label>
            <Input
              type="text"
              name="productId"
              placeholder="Enter Product Id"
              value={formData.productId}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter Product Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => {
                setFormData({ ...formData, category: value });
              }}
              value={formData.category}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {options && options.length > 0
                  ? options.map((option) => {
                      return (
                        <SelectItem key={option.id} value={option.label}>
                          {option.label}
                        </SelectItem>
                      );
                    })
                  : null}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex  sm:gap-4 gap-2">
          <div className="grid w-full gap-1.5">
            <Label>Unit Cost</Label>
            <Input
              type="number"
              name="unitPurchaseCost"
              placeholder="Enter Unit Cost"
              value={formData.unitPurchaseCost}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label>Total Cost</Label>
            <Input
              type="number"
              name="totalPurchaseCost"
              placeholder="Enter Total Cost"
              value={formData.totalPurchaseCost}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* <div className="flex gap-4">
          <div className="flex w-full gap-1.5">
            <Checkbox
              checked={!hasVariants}
              onCheckedChange={() => {
                setHasVariants(false);
                setFormData({
                  ...formData,
                  variants: [],
                });
              }}
            />
            <Label>No Variants</Label>
          </div>
          <div className="flex w-full gap-1.5">
            <Checkbox
              checked={hasVariants}
              onCheckedChange={() => {
                setHasVariants(true);
                setFormData({
                  ...formData,
                  stock: 0,
                });
              }}
            />
            <Label>Variants</Label>
          </div>
        </div>
        {!hasVariants ? (
          <div className="flex  sm:gap-4 gap-2">
            <div className="grid w-full gap-1.5">
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                placeholder="Enter Stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ) : (
          <div>
            {formData.variants.map((variant, index) => (
              <div key={index} className="flex sm:gap-4 gap-2">
                <div className="grid w-20 gap-1.5">
                  <Label>Color</Label>
                  <Input
                    className="rounded-full p-1 h-10 w-10"
                    type="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, e)}
                    name="color"
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label>Size</Label>
                  <Input
                    type="text"
                    name="size"
                    placeholder="Enter Size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, e)}
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    name="stock"
                    placeholder="Enter Product Stock"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, e)}
                  />
                </div>
              </div>
            ))}

            <Button
              className="mt-2 h-8 w-full"
              type="button"
              variant="outline"
              onClick={addVariant}
            >
              Add Variant
            </Button>
          </div>
        )}
        {hasVariants ? (
          <div className="grid w-full gap-1.5">
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        ) : null} */}
        <div className="flex sm:gap-4 gap-2">
          <div className="grid flex-1 gap-1.5">
            <Label>Stock</Label>
            <Input
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid flex-1 gap-1.5">
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
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

export default ProductUpdateForm;
