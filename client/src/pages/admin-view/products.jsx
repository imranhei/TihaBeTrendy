import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adddProductFormElements } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { useToast } from "../../hooks/use-toast";
import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  productId: "",
  title: "",
  category: "",
  price: "",
  salePrice: "",
  stock: "",
  purchasePrice: "",
  date: "",
};

const AdminProducts = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  // console.log(formData);
  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(updateProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Product Updated Successfully",
              });
            }
          }
        )
      : dispatch(
          addProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            // setUploadedImageUrl("");
            toast({
              title: "Product Added Successfully",
            });
          }
        });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product Deleted Successfully",
        });
      }
    });
  };

  // const isFormValid = () => {
  //   return Object.keys(formData)
  //     .map((key) => formData[key] !== "")
  //     .every((item) => item);
  // };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6">
      <Button
        className="underline-effect overflow-hidden hover:bg-white rounded-sm hover:text-violet-700 shadow-md shadow-violet-300 w-40"
        onClick={() => {
          setFormData(initialFormData);
          setIsDialogOpen(true);
        }}
      >
        Add New Product
      </Button>

      {/* Display product tiles */}
      <div className="flex flex-wrap justify-center gap-6">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product._id}
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                handleDelete={handleDelete}
                setIsDialogOpen={setIsDialogOpen}
              />
            ))
          : null}
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
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-4">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={adddProductFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              // isButtonDisable={!isFormValid()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
