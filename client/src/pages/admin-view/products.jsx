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
import { CirclePlus, LayoutGrid, LayoutList } from "lucide-react";
import AdminProductList from "@/components/admin-view/product-list";
import ProductUpdateForm from "@/components/admin-view/product-update-form";

const initialFormData = {
  image: null,
  productId: "",
  title: "",
  category: "",
  price: "",
  unitPurchaseCost: "",
  totalPurchaseCost: "",
  stock: "",
  // variants: [],
  date: "",
};

const AdminProducts = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState("card");
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
            setUploadedImageUrl("");
            toast({
              title: "Product Added Successfully",
            });
          }
        });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product Deleted Successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex sm:gap-4 gap-2 justify-end">
        <Button
          className="p-3 sm:p-4 shadow-md"
          onClick={() => setView("card")}
        >
          <LayoutGrid size={20} />
          <p className="sm:ml-2 sm:block hidden">Card View</p>
        </Button>
        <Button
          className="p-3 sm:p-4 shadow-md"
          onClick={() => setView("list")}
        >
          <LayoutList size={20} />
          <p className="sm:ml-2 sm:block hidden">List View</p>
        </Button>
        <Button
          className="sm:underline-effect overflow-hidden sm:hover:bg-white sm:rounded-sm sm:hover:text-violet-700 shadow-md sm:shadow-violet-300 w-fit p-3 sm:p-4"
          onClick={() => {
            setFormData(initialFormData);
            setIsDialogOpen(true);
          }}
        >
          <CirclePlus size={20} />{" "}
          <p className="sm:ml-2 sm:block hidden">Add New Product</p>
        </Button>
      </div>

      {/* Display product tiles */}
      <div className="flex flex-wrap justify-center gap-6">
        {productList && productList.length > 0 && view === "card" ? (
          productList.map((product) => (
            <AdminProductTile
              key={product._id}
              product={product}
              setCurrentEditedId={setCurrentEditedId}
              setFormData={setFormData}
              handleDelete={handleDelete}
              setIsDialogOpen={setIsDialogOpen}
            />
          ))
        ) : productList && productList.length > 0 && view === "list" ? (
          <AdminProductList
            productList={productList}
            setCurrentEditedId={setCurrentEditedId}
            setFormData={setFormData}
            handleDelete={handleDelete}
            setIsDialogOpen={setIsDialogOpen}
          />
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <p className="text-xl font-semibold">No Products Found</p>
          </div>
        )}
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
          <div className="sm:py-4 py-0">
            {/* <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={adddProductFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              // isButtonDisable={!isFormValid()}
            /> */}
            <ProductUpdateForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              isButtonDisable={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
