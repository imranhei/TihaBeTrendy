import React from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpenSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logoutUser()); //if i have any subdomain
    dispatch(resetTokenAndCredentials()); //if i don't have any subdomain
    navigate("/shop/home");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b shadow-md">
      <div className="flex justify-between flex-1 items-center">
      <Button
        onClick={() => setOpenSidebar(true)}
        className="lg:hidden sm:block px-2 sm:px-4 h-8 sm:h-10"
        variant="white"
      >
        <AlignJustify size={18} />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-start items-center">
        <img src="/tiha_icon.png" className="lg:w-16 sm:w-14 w-12 mr-2 lg:ml-0 ml-2" />
        <span className="font-bold text-lg text-violet-800 sm:block hidden">
          Tiha Be Trendy
        </span>
      </div>
      {/* <div className="flex flex-1 justify-end"> */}
        <Button
          onClick={handleLogout}
          className="inline-flex lg:gap-2 sm:gap-1 items-center py-2 sm:text-sm text-xs font-medium px-3 sm:px-4 h-8 sm:h-10"
          variant="white"
        >
          <LogOut size={18} />
          <span className="sm:block hidden">Log Out</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
