import { UserPen, MailPlus, Lock, LockOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  emailRegx,
  errorMessages,
  passwordRegx,
  usernameRegx,
} from "../constants/index.jsx";
import { useState } from "react";
import useAuthStore from "../store/authUser";
import { Spinner } from ".";

const AuthForm = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, login, isLoading } = useAuthStore();
  const onSubmit = (data) => {
    if (type === "signup") {
      signup(data);
    } else {
      login(data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex box-animation p-3 box-gradient rounded-md w-full flex-col  gap-6"
    >
      {type === "signup" && (
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="username" className="font-semibold text-lg">
            Username
          </label>
          <div
            className={`flex gap-3 p-2 ${
              errors.username?.message
                ? "border-2 border-red-800 rounded-lg"
                : "gradient-border"
            }`}
          >
            <UserPen color={errors.username?.message ? "#991b1b" : "#fff"} />
            <input
              type="text"
              className="outline-none w-full border-none bg-transparent text-white"
              id="username"
              placeholder="Joe Doe"
              {...register("username", {
                required: {
                  value: true,
                  message: errorMessages.required_field,
                },
                pattern: {
                  value: usernameRegx,
                  message: errorMessages.username_field,
                },
              })}
            />
          </div>
          {errors.username && (
            <p className="text-sm -mb-4 -mt-2 font-medium text-red-800">
              {errors.username?.message}
            </p>
          )}
        </div>
      )}
      <div className="flex w-full flex-col gap-3">
        <label htmlFor="email" className="font-semibold text-lg">
          Email
        </label>
        <div
          className={`flex gap-3 p-2 ${
            errors.email?.message
              ? "border-2 border-red-800 rounded-lg"
              : "gradient-border"
          }`}
        >
          <MailPlus color={errors.email?.message ? "#991b1b" : "#fff"} />
          <input
            type="text"
            id="email"
            placeholder="joedoe@gmail.com"
            defaultValue={emailValue}
            className="outline-none w-full border-none bg-transparent text-white"
            {...register("email", {
              required: {
                value: true,
                message: errorMessages.required_field,
              },
              pattern: {
                value: emailRegx,
                message: errorMessages.email_field,
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-sm -mb-4 -mt-2 font-medium text-red-800">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-3">
        <label htmlFor="password" className="font-semibold text-lg">
          Password
        </label>
        <div>
          <div
            className={`flex gap-3 p-2 ${
              errors.password?.message
                ? "border-2 border-red-800 rounded-lg"
                : "gradient-border"
            }`}
          >
            <div
              className="cursor-pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <LockOpen
                  color={errors.password?.message ? "#991b1b" : "#69b500"}
                />
              ) : (
                <Lock color={errors.password?.message ? "#991b1b" : "#fff"} />
              )}
            </div>
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              placeholder="•••••••••"
              className="outline-none  w-full border-none bg-transparent text-white"
              {...register("password", {
                required: {
                  value: true,
                  message: errorMessages.required_field,
                },
                pattern: {
                  value: passwordRegx,
                  message: errorMessages.password_field,
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm -mb-4  font-medium text-red-800">
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`main-btn text-center btn-gradient ${
          isLoading && "opacity-70 cursor-not-allowed"
        }`}
      >
        {type === "signup" && !isLoading && "Sign Up"}
        {type !== "signup" && !isLoading && "Log In"}
        {isLoading && <Spinner />}
      </button>
      <p className="text-sm text-center -mt-3">
        <span>
          {type === "signup" ? "You're already one of us!" : "You're new here!"}
        </span>
        {"  "}
        <Link
          className="underline font-semibold hover:text-pink transition"
          to={type === "signup" ? "/sign-in" : "/sign-up"}
        >
          {type === "signup" ? "Log In" : "Sign Up"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
