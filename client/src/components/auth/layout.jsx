import { Separator } from "@radix-ui/react-select";
import { Outlet } from "react-router-dom";
import { ArrowLeft, House } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2">
        <div className="max-w-lg space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Welcome to Tiha Be Trendy!
          </h1>
          <Separator className="border-b border-primary-foreground max-w-md mx-auto" />
          <h2 className="text-lg">Discover adorable beauty essentials for your little ones.</h2>
          <Link to='/shop/home'><Button variant="link" className="text-background"><House className="h-4 w-4 mx-auto mr-2" />Shop</Button></Link>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-2 lg:hidden block">
      <Link to='/shop/home' className="flex items-center"><ArrowLeft size={20} />&nbsp;Home</Link>
      </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
