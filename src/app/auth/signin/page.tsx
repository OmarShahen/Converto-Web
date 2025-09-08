"use client";
import EyeIcon from "@/icons/eye";
import OpenEyeIcon from "@/icons/openEye";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { serverRequest } from "@/lib/axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { GoogleIcon } from "@/components/icons";
import { SocialsButton } from "@/components/buttons/SocialsButton";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

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

      const loginData = { email: email.trim(), password: password.trim() };
      const response = await serverRequest.post("/v1/auth/login", loginData);
      const { user, token } = response.data;

      localStorage.setItem("accessToken", token);
      dispatch(setUser(user));

      // Redirect to the intended page or dashboard
      const redirectTo = returnUrl || "/app/dashboard";
      router.push(redirectTo);
    } catch (err: any) {
      // Show error toast
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during login";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // @ts-ignore - Google object from script
    const client = window.google?.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: "openid email profile",
      callback: async (googleResponse: any) => {
        try {
          const accessToken = googleResponse.access_token;
          const response = await serverRequest.post("/v1/auth/login/google", {
            accessToken,
          });
          const { user, token } = response.data;

          localStorage.setItem("accessToken", token);
          dispatch(setUser(user));

          // Redirect to the intended page or stores page
          const redirectTo = returnUrl || "/app/stores";
          router.push(redirectTo);
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
          Welcome Back!
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Your AI-powered assistant is ready to help you sell smarter.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-custom-secondary-text"
          >
            Email
          </label>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            required
            className="!bg-#f5f5f5"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-custom-secondary-text"
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
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-custom-secondary-text"
          >
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="flex gap-2 items-center my-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-sm text-gray-400">or sign in with</span>
        <hr className="flex-1 border-gray-300" />
      </div>
      <div>
        <div className="mb-4">
          <SocialsButton
            text="Sign In With Google"
            icon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-center">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="font-semibold text-[#607AFB]">
          Sign Up
        </Link>
      </div>

      {/*<div>
        <button
          onClick={() => {
            window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=231026032720703&redirect_uri=https://fuzzy-tips-follow.loca.lt/api/v1/facebook/callback&scope=pages_messaging,pages_manage_metadata,pages_show_list,public_profile&state=686a61dd031c93f127d1a928`;
          }}
        >
          Connect Facebook Page
        </button>
      </div>*/}
    </>
  );
}
