import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-red-100">
      <h1 className="w-full text-center lg:text-4xl sm:text-3xl text-2xl font-extrabold lg:py-6  text-gray-500">
        Unauthorized Access
      </h1>
      <p className="text-center sm:text-xl my-6 font-semibold">
        You are not authorized to access this page or this page does not exist.
      </p>
      <p className="text-center sm:text-lg font-semibold">
        Please login to access this page or go back.
      </p>
      <div className="flex justify-between items-center lg:gap-20 gap-10 pt-6">
        <Link to="/shop/home">
          <Button className="bg-red-500 hover:bg-red-600 text-white w-28 shadow-md">
            Home
          </Button>
        </Link>
        {!isAuthenticated ? (
          <Link to="/auth/login">
            <Button className="bg-red-500 hover:bg-red-600 text-white w-28 shadow-md">
              Login
            </Button>
          </Link>
        ) : (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white w-28 shadow-md"
            onClick={() => navigate(-1)} // Use `navigate(-1)` to go to the previous page
          >
            Previous Page
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
