import { Fragment } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  BadgeDollarSign,
  Truck
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "report",
    label: "Report",
    path: "/admin/sales",
    icon: <BadgeDollarSign size={20} />,
  },
  {
    id: "delivery",
    label: "Delivery",
    path: "/admin/delivery",
    icon: <Truck size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={20} />,
  },
];

function MenuItem({ setOpenSidebar }) {
  const location = useLocation();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <Link
        to={item.path}
          key={item.id}
          className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-gray-500 hover:text-black cursor-pointer hover:bg-gray-100 ${location.pathname.includes(item.path) ? "bg-gray-100" : ""}`}
          onClick={() => {
            setOpenSidebar ? setOpenSidebar(false) : null;
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpenSidebar}>
        <SheetContent
          side="left"
          className="w-64 bg-white"
          aria-describedby="sidebar"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2">
                <ChartNoAxesCombined size={30} />
                <span className="text-xl font-extrabold">Admin Panel</span>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <MenuItem setOpenSidebar={setOpenSidebar} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItem />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
