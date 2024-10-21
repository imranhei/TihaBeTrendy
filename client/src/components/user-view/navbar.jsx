import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { House, LogOut, Menu, ShoppingCart, User, LogIn } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";

const MenuItems = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 md:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        return (
          <Link
            // onClick={() => handleNavigate(menuItem)}
            key={menuItem.id}
            to={menuItem.path}
            className={`text-sm font-medium cursor-pointer hover:text-primary ${
              location.pathname.includes(menuItem.path)
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {menuItem.label}
          </Link>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser()); //if i have any subdomain
    dispatch(resetTokenAndCredentials()); //if i don't have any subdomain
    navigate("/shop/home");
  };

  return (
    <div className="flex md:items-center md:flex-row flex-col gap-4">
      {isAuthenticated ? (
        <>
          <Sheet
            open={openCartSheet}
            onOpenChange={() => setOpenCartSheet(false)}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpenCartSheet(true)}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* <span className="absolute -top-2 right-px text-sm font-bold">
            {cartItems?.items?.length || 0}
          </span> */}
              <span className="sr-only">User Cart</span>
            </Button>
            {/* <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems?.items && cartItems?.items?.length > 0
              ? cartItems?.items
              : []
          }
        /> */}
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-black">
                <AvatarFallback className="bg-vlack text-white font-extrabold uppercase ">
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
              <DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <User className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link to="/auth/login">
          <Button>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          <img src="/tiha_icon.png" className="w-20" />
          {/* <span className="font-bold text-lg text-violet-800">
            Tiha Be Trendy
          </span> */}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <MenuItems />
        </div>
        <div className="hidden md:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
