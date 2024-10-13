import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "../../hooks/use-toast"

const initialState = {
  name: "",
  email: "",
  password: "",
};

const AuthResgister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    
    //form validation
    if(formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password and confirm password do not match",
      });
      return;
    }

    //valid gmail check
    const email = formData.email;
    const validGmail = new RegExp(
      /^[a-zA-Z0-9._-]+@gmail.com$/
    );
    if (!validGmail.test(email)) {
      toast({
        variant: "destructive",
        title: "Please enter a valid gmail address",
      });
      return;
    }

    //all fields are required
    if (!formData.name || !formData.email || !formData.password) {
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

    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Registration success",
        });
        navigate("/auth/login");
      } else {
        console.log(data?.payload?.error);
        toast({
          variant: "destructive",
          title: data?.payload?.message || "Registration failed",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-blue-500 hover:text-blue-600 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthResgister;
