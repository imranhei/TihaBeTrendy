import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "../../hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    //all fields are required
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "All fields are required",
      });
      return;
    }

    //minimum password length check
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password must be at least 6 characters",
      });
      return;
    }

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload && data?.payload?.success) {
        navigate("/shop/home");
        toast({
          title: data.payload.message || "Login successful",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data?.payload?.message || data?.error?.message || "",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-blue-500 hover:text-blue-600 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        loadingText={"Signing In..."}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AuthLogin;
