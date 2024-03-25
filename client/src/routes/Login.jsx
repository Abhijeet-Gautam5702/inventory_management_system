import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onFormSubmit(data) {
    console.log(data);
    // Send the data to the backend-API to validate the user credentials
    // Once user is logged-in, redirect to the Dashboard-Page
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className=" w-full h-screen flex flex-row justify-center items-center bg-slate-300 font-primary">
      <div className="bg-light px-5 py-5 rounded-lg w-1/3 drop-shadow-xl">
        {/* Logo */}
        <div className="pb-4 flex flex-col justify-start items-center font-head text-primary">
          <p className="text-4xl font-bold">verbatim</p>
          <p className="text-xs mt-[-5px]">manage your inventory</p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col justify-center items-start "
          onSubmit={handleSubmit(onFormSubmit)}
        >
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
            placeholder="Enter your password"
          />
          <input
            className="cursor-pointer bg-primary px-5 py-4 text-white w-full m-auto mt-1 rounded-lg"
            type="submit"
            value="Login"
          />
        </form>

        {/* Register Prompt */}
        <p className="text-sm text-primary m-auto text-center mt-2">
          Do not have an account?{" "}
          <span className="font-semibold underline cursor-pointer">
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
