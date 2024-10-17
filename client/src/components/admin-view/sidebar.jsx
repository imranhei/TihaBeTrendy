import { Fragment, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  BadgeDollarSign,
  Truck,
  ChevronDown,
  Settings,
  FileChartColumnIncreasing,
  Users,
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
    path: "/admin/dashboard/analytics",
    icon: <LayoutDashboard size={20} />,
    submenu: [
      {
        id: "analytics",
        label: "Analytics",
        path: "/admin/dashboard/analytics",
      },
      {
        id: "summary",
        label: "Summary",
        path: "/admin/dashboard/summary",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "management",
    label: "Management",
    path: "/admin/management",
    icon: <FileChartColumnIncreasing size={20} />,
    submenu: [
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
    ],
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: <Users size={18} />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/profile",
    icon: <Settings size={20} />,
    submenu: [
      {
        id: "profile",
        label: "Profile",
        path: "/admin/profile",
      },
      {
        id: "account",
        label: "Account",
        path: "/admin/account",
      },
      // {
      //   id: "security",
      //   label: "Security",
      //   path: "/admin/settings/security",
      // },
    ],
  },
];

function MenuItem({ setOpenSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(null)
  const location = useLocation();

  const handleMenuClick = (itemId) => {
    setOpenMenu(openMenu === itemId ? null : itemId);
  };

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div key={item.id} className="flex flex-col">
          <Link
            to={item.submenu ? item.submenu[0].path : item.path}
            className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 font-semibold text-gray-500 hover:text-black cursor-pointer hover:bg-gray-100 ${
              location.pathname.includes(item.path) ? "bg-gray-100" : ""
            }`}
            onClick={() => setSubmenuOpen(item.id)}
          >
            <p className="flex items-center gap-2 z-20">
              {item.icon}
              <span>{item.label}</span>
            </p>
            {item.submenu && (
              <ChevronDown
                className={`${
                  openMenu && openMenu === item.id ? "rotate-180" : ""
                } transition-all duration-300 z-30`}
                size={20}
                onClick={() => {
                  handleMenuClick(item.id);
                  setOpenSidebar && setOpenSidebar(false);
                }}
              />
            )}
          </Link>
          {item.submenu && openMenu === item.id && (
            <div
              className={`expandable ${
                openMenu === item.id ? "show" : ""
              } ml-6 mt-2 flex flex-col gap-2`}
            >
              {item.submenu.map((subItem) => (
                <Link
                  to={subItem.path}
                  key={subItem.id}
                  className={`flex items-center gap-2 font-semibold rounded-md px-3 py-2 text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-100 ${
                    location.pathname.includes(subItem.path)
                      ? "bg-gray-100 text-gray-800"
                      : ""
                  }`}
                  onClick={() => {
                    setOpenSidebar ? setOpenSidebar(false) : null;
                  }}
                >
                  <span>{subItem.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
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
