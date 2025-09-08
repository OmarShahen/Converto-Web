"use client";
import EyeIcon from "@/icons/eye";
import OpenEyeIcon from "@/icons/openEye";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { serverRequest } from "@/lib/axios";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const code = searchParams.get("code") || "0";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        return toast.error("Both passwords must be the same");
      }

      const resetPasswordData = {
        password: password.trim(),
        email,
        verificationCode: Number.parseInt(code),
      };

      await serverRequest.post(`/v1/auth/reset-password`, resetPasswordData);

      router.push("/auth/login");
    } catch (err: any) {
      // Show error toast
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-custom-heading-black">
          Reset Your Password
        </h1>
        <h6 className="text-sm font-normal text-[#757575] m-0 p-0">
          Create a new password for your account.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-custom-secondary-text"
          >
            Confirm Password
          </label>
          <div className="relative">
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="current-password"
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={0}
              role="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? <EyeIcon /> : <OpenEyeIcon />}
            </span>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}
