import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import customErrorToastMessage from "../utilities/customErrorToastMessage.js";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function registerUser(data) {
    setIsLoading((prevValue) => !prevValue);

    try {
      // Send the data to the backend-API to register the user
      await axios.post("http://localhost:3000/api/v1/user/register", {
        fullname: data.fullname.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });

      // Registration-Success Toast
      toast.success("User Registration Successful", {
        position: "top-center",
        duration: 3000,
      });

      // Once user is registered, redirect to the Dashboard-Page
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      const errorCode = error.response.data.statusCode;
      const toastMessage = customErrorToastMessage(
        {
          409: "User with the email already exists",
          400: "One or more required fields are empty",
          500: "Internal Server Error",
        },
        errorCode
      );

      // Send a Toast
      toast.error(toastMessage, {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" w-full h-screen flex flex-row justify-center items-center bg-slate-300 font-primary">
      {/* Toaster */}
      <Toaster />
      {isLoading == true ? (
        <FallingLines
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
          color="#004aad"
        />
      ) : (
        <div className="bg-light px-5 py-5 rounded-lg w-1/3 drop-shadow-xl">
          {/* Logo */}
          <div className="pb-4 flex flex-col justify-start items-center font-head text-primary">
            <p className="text-4xl font-bold">verbatim</p>
            <p className="text-xs mt-[-5px]">manage your inventory</p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col justify-center items-start "
            onSubmit={handleSubmit(registerUser)}
          >
            <label className="font-semibold text-primary" htmlFor="fullname">
              {" "}
              Full Name
            </label>
            <input
              type="fullname"
              id="fullname"
              className="text-sm p-4 rounded-lg w-full text-secondary bg-tertiary caret-secondary placeholder-secondary mb-4 focus:outline-none focus:border-primary focus:ring-1"
              {...register("fullname", { required: true, minLength: 2 })}
              placeholder="Enter your fullname (Minimum 2 characters)"
            />
            <label className="font-semibold text-primary" htmlFor="email">
              {" "}
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-sm p-4 rounded-lg w-full text-secondary bg-tertiary caret-secondary placeholder-secondary mb-4 focus:outline-none focus:border-primary focus:ring-1"
              {...register("email", { required: true })}
              placeholder="Enter your e-mail"
            />
            <label className="font-semibold text-primary" htmlFor="password">
              {" "}
              Password
            </label>
            <input
              type="password"
              id="password"
              className="text-sm p-4 rounded-lg w-full text-secondary bg-tertiary caret-secondary placeholder-secondary mb-4 focus:outline-none focus:border-primary focus:ring-1"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password (Minimum 6 characters)"
            />
            <input
              className="cursor-pointer bg-primary px-5 py-4 text-white w-full m-auto mt-1 rounded-lg"
              type="submit"
              value="Create Account"
            />
          </form>

          {/* Login Prompt */}
          <p className="text-sm text-primary m-auto text-center mt-2">
            Already have an account?{" "}
            <span className="font-semibold underline cursor-pointer">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
