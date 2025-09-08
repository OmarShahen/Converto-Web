"use client";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { serverRequest } from "@/lib/axios";

export default function ForgotPassword() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;

      const forgotPassworData = { email: email.trim() };

      await serverRequest.post("/v1/auth/forgot-password", forgotPassworData);

      router.push(`/auth/forgot-password/verification-code?email=${email}`);
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

  return (
    <>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-custom-heading-black">
          Forgot Your Password?
        </h1>
        <h6 className="text-sm font-normal text-[#757575] m-0 p-0">
          No worries — we’ll send you a code to reset it.
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
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>
    </>
  );
}
