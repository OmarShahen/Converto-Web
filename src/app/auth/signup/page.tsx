"use client";
import EyeIcon from "@/icons/eye";
import OpenEyeIcon from "@/icons/openEye";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import { serverRequest } from "@/lib/axios";
import { SocialsButton } from "@/components/buttons/SocialsButton";
import { GoogleIcon } from "@/components/icons";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function Signup() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const signupData = {
        email: email.trim(),
        password: password.trim(),
      };

      const response = await serverRequest.post("/v1/auth/signup", signupData);
      const { user } = response.data;
      router.push(`/auth/signup/${user._id}/${user.email}/verification-code`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during signup";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // @ts-ignore - Google object from script
    const client = window.google?.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: "openid email profile",
      callback: async (googleResponse: any) => {
        try {
          const accessToken = googleResponse.access_token;
          const response = await serverRequest.post("/v1/auth/signup/google", {
            accessToken,
          });
          const { user, token } = response.data;
          localStorage.setItem("accessToken", token);
          dispatch(setUser(user));
          router.push(`/onboarding/basic-info`);
        } catch (error: any) {
          console.error(error);
          toast.error(error?.response?.data?.message || "there was a problem");
        }
      },
    });

    client?.requestAccessToken();
  };

  return (
    <>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          Let’s get started
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Transform your store with a sales assistant that works 24/7.
        </h6>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <InputField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeIcon /> : <OpenEyeIcon />}
            </span>
          </div>
        </div>
        <Button type="submit" className="mt-2" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign up"}
        </Button>
      </form>
      <div className="flex gap-2 items-center my-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-sm text-gray-400">or sign up with</span>
        <hr className="flex-1 border-gray-300" />
      </div>
      <div>
        <div className="mb-4">
          <SocialsButton
            text="Sign Up With Google"
            icon={<GoogleIcon />}
            onClick={handleGoogleSignup}
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-center">
        Already have an account?{" "}
        <Link href="/auth/signin" className="font-semibold text-[#607AFB]">
          Sign In
        </Link>
      </div>
    </>
  );
}
