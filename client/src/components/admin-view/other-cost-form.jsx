import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RotateCw } from "lucide-react";

const OtherCostForm = ({
  onSubmit,
  formData,
  setFormData,
  buttonText,
  loadingText,
  isButtonDisable,
}) => {
  const { isLoading } = useSelector((state) => state.adminOtherCosts);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        <div className="grid w-full gap-1.5">
          <Label>Cost</Label>
          <Input
            type="number"
            name="amount"
            value={formData?.amount}
            onChange={(event) =>
              setFormData({ ...formData, amount: event.target.value })
            }
            placeholder="Enter Cost"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label>Cause</Label>
          <Input
            type="text"
            name="title"
            value={formData?.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
            placeholder="Enter Cause"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={formData?.date}
            onChange={(event) =>
              setFormData({ ...formData, date: event.target.value })
            }
            placeholder="Enter Date"
          />
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

export default OtherCostForm;
