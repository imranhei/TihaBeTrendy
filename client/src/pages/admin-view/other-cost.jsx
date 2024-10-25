import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import AdminOtherCostTable from "@/components/admin-view/other-cost-table";
import { useToast } from "../../hooks/use-toast";
import {
  addOtherCost,
  fetchAllOtherCosts,
  updateOtherCost,
  deleteOtherCost,
} from "@/store/admin/other-cost-slice";
import { CirclePlus } from "lucide-react";
import OtherCostForm from "@/components/admin-view/other-cost-form";

const initialFormData = {
  title: "",
  amount: 0,
  date: "",
};

const OtherCost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { otherCostList } = useSelector((state) => state.adminOtherCosts);
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(updateOtherCost({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllOtherCosts());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              setIsDialogOpen(false);
              toast({
                message: "Cost updated successfully",
              });
            } else {
              toast({
                message: "Failed to update cost",
                type: "destractive",
              });
            }
          }
        )
      : dispatch(addOtherCost(formData)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllOtherCosts());
            setFormData(initialFormData);
            setIsDialogOpen(false);
            toast({
              message: "Cost added successfully",
            });
          } else {
            toast({
              message: "Failed to add cost",
              type: "destractive",
            });
          }
        });
  };

  const handleDelete = (id) => {
    dispatch(deleteOtherCost(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllOtherCosts());
        setIsModalOpen(false);
        toast({
          message: "Cost deleted successfully",
        });
      } else {
        toast({
          message: "Failed to delete cost",
          type: "destractive",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllOtherCosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1 relative">
      <Button
        className="!absolute underline-effect overflow-hidden hover:bg-white rounded-sm hover:text-violet-700 shadow-md shadow-violet-300 w-fit p-3 sm:p-4"
        onClick={() => {
          setFormData(initialFormData);
          setIsDialogOpen(true);
        }}
      >
        <CirclePlus size={20} />{" "}
        <p className="sm:ml-2 sm:block hidden">Add Other Cost</p>
      </Button>
      <h1 className="text-center sm:text-3xl text-xl text-muted-foreground font-bold !mt-0">
        Others Cost
      </h1>
      <div className="bg-white flex-1 sm:p-6 p-4 shadow-md rounded-md">
        <AdminOtherCostTable
          otherCostList={otherCostList}
          setCurrentEditedId={setCurrentEditedId}
          setFormData={setFormData}
          setIsDialogOpen={setIsDialogOpen}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      </div>

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
              {currentEditedId !== null ? "Edit Cost" : "Add New Other Cost"}
            </DialogTitle>
            <DialogDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <OtherCostForm
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

export default OtherCost;
