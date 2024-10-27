import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { useToast } from "../../hooks/use-toast";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import { CirclePlus, LayoutGrid, LayoutList } from "lucide-react";
import AdminProductList from "@/components/admin-view/product-list";
import ProductUpdateForm from "@/components/admin-view/product-update-form";
import AdminFilters from "@/components/admin-view/admin-filter";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/common/modal";

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
  const [view, setView] = useState("list");

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  const categorySearchParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const createSearchParamHelper = () => {
    const params = new URLSearchParams();
    if (filters.length > 0) params.append("category", filters.join(","));
    if (sort) params.append("sort", sort);
    if (search) params.append("search", search);
    return params;
  };

  const handleSort = (value) => setSort(value);

  const handleFilter = (category) => {
    const tempFilters = filters.includes(category)
      ? filters.filter((item) => item !== category)
      : [...filters, category];
    setFilters(tempFilters);
    sessionStorage.setItem("filters", JSON.stringify(tempFilters));
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(updateProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts({}));
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Product Updated Successfully",
              });
            } else {
              toast({
                variant: "destructive",
                title: data?.payload?.message?.message || "Product Update Failed",
              description: data?.payload?.message?.error || "",
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
            dispatch(fetchAllProducts({}));
            setImageFile(null);
            setFormData(initialFormData);
            setUploadedImageUrl("");
            toast({
              title: "Product Added Successfully",
            });
          } else {
            toast({
              variant: "destructive",
              title: data?.payload?.message?.message || "Product Addition Failed",
              description: data?.payload?.message?.error || "",
            });
          }
        });
  };

  const handleDelete = async (id) => {
    try {
      const data = await dispatch(deleteProduct(id)).unwrap();
      if (data.success) {
        setIsDeleteModalOpen(false);
        dispatch(fetchAllProducts({}));
        toast({ title: "Product Deleted Successfully" });
      }
    } catch (error) {
      toast({
        title: "Failed to delete product",
        description: error.message,
        variant: "destractive",
      });
    }
  };

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || [];
    setFilters(Array.isArray(savedFilters) ? savedFilters : []);
  }, []);

  useEffect(() => {
    const query = createSearchParamHelper();
    setSearchParams(query);
    dispatch(
      fetchAllProducts({
        filterParams: filters,
        sortParams: sort,
        searchParams: search,
      })
    );
  }, [filters, sort, search, dispatch]);

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex justify-between sm:gap-4 gap-2">
        <AdminFilters
          handleFilter={handleFilter}
          filters={filters}
          handleSort={handleSort}
          sort={sort}
          handleSearch={handleSearch}
        />
        <div className="flex flex-col items-start sm:gap-2 gap-2">
          <Button
            className={`p-3 sm:p-4 shadow-md w-full !border-1 border-violet-500 ${
              view === "card"
                ? "bg-violet-600 hover:bg-violet-500 text-white hover:text-white"
                : "bg-violet-50 text-violet-600 hover:text-violet-600"
            }`}
            onClick={() => setView("card")}
            variant="outline"
          >
            <LayoutGrid size={20} />
            <p className="sm:ml-2 sm:block hidden">Card View</p>
          </Button>
          <Button
            className={`p-3 sm:p-4 shadow-md w-full !border-1 border-violet-500 ${
              view === "list"
                ? "bg-violet-600 hover:bg-violet-500 text-white hover:text-white"
                : "bg-violet-50 text-violet-600 hover:text-violet-600"
            }`}
            onClick={() => setView("list")}
            variant="outline"
          >
            <LayoutList size={20} />
            <p className="sm:ml-2 sm:block hidden">List View</p>
          </Button>
          <Button
            className="shadow-md p-3 sm:p-4 !border-1 border-violet-500 bg-violet-50 text-violet-600 hover:text-violet-600"
            onClick={() => {
              setFormData(initialFormData);
              setIsDialogOpen(true);
            }}
            variant="outline"
          >
            <CirclePlus size={20} />{" "}
            <p className="sm:ml-2 sm:block hidden">Add New Product</p>
          </Button>
        </div>
      </div>
      <Separator />
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
              setIsModalOpen={setIsModalOpen}
            />
          ))
        ) : productList && productList.length > 0 && view === "list" ? (
          <AdminProductList
            productList={productList}
            setCurrentEditedId={setCurrentEditedId}
            setFormData={setFormData}
            handleDelete={handleDelete}
            setIsDialogOpen={setIsDialogOpen}
            setIsModalOpen={setIsModalOpen}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <p className="text-xl font-semibold">No Products Found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onOpenChange={() => {
          setCurrentEditedId(null);
        }}
        currentId={currentEditedId}
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
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
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
            <ProductUpdateForm
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

export default AdminProducts;
