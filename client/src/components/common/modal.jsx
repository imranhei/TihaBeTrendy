import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductById } from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";

const Modal = ({
  isOpen,
  onConfirm,
  title,
  setIsModalOpen,
  description,
  currentId,
  children,
  className,
}) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (currentId) {
      dispatch(fetchProductById(currentId)).then((data) => {
        if (!data?.payload?.success) {
          toast({
            title: "Failed to fetch product",
            variant: "destructive",
          });
        } else {
          setData(data.payload.data);
        }
      });
    }
  }, [currentId, setIsModalOpen]);

  return (
    <div
      // data-state={isOpen ? "open" : "closed"}
      className={`${
        isOpen ? "block animate-in fade-in-0" : "hidden animate-out fade-out-0"
      } fixed inset-0 z-50 !m-0 bg-black/80`}
    >
      <div
        data-state={isOpen ? "open" : "closed"}
        className="fixed left-[50%] top-[50%] z-50 grid w-5/6 max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg rounded-md"
      >
        <div className="flex sm:flex-row flex-col gap-4">
          <div className="flex-1">
            <img
              src={data?.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold text-muted-foreground">
              Product Id: {data?.productId}
            </h1>
            <h1 className="text-2xl font-semibold text-muted-foreground">
              Title: {data?.title}
            </h1>
            <p className="text-muted-foreground">Category: {data?.category}</p>
            <p className="text-muted-foreground">Price: {data?.price}</p>
            <p className="text-muted-foreground">
              Unit Cost: {data?.unitPurchaseCost}
            </p>
            <p className="text-muted-foreground">In Stock: {data?.stock}</p>
            <p className="text-muted-foreground">
              Profit Margin:{" "}
              {(
                ((data?.price - data?.unitPurchaseCost) / data?.price) *
                100
              ).toFixed(2)}
              %
            </p>
            <p className="text-muted-foreground">Purshase Date: {data?.date}</p>
          </div>
        </div>
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X onClick={() => setIsModalOpen(false)} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
