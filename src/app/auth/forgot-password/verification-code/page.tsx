"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import CodeInputField from "@/components/Inputs/CodeInputField";
import { serverRequest } from "@/lib/axios";

export default function ResetPasswordVerificationCode() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const verificationCodeData = {
        email,
        verificationCode: Number.parseInt(code),
      };
      await serverRequest.post(
        `/v1/auth/verify/reset-password/verification-code`,
        verificationCodeData
      );

      router.push(
        `/auth/forgot-password/reset-password?email=${email}&code=${code}`
      );
    } catch (err: any) {
      // Show error toast
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during signup";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const forgotPasswordData = { email };
      const response = await serverRequest.post(
        `/v1/auth/forgot-password`,
        forgotPasswordData
      );
      toast.success(response.data.message);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occured during resending";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-custom-heading-black m-0 p-0">
          Enter the Verification Code
        </h1>
        <h6 className="text-sm font-normal text-[#757575] m-0 p-0">
          Please enter code we sent to{" "}
          <strong className="text-gray-700">{email}</strong>
        </h6>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <CodeInputField length={6} onChange={(val) => setCode(val)} />
        </div>
        <Button type="submit" className="mt-2" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>
      <div className="text-sm text-center">
        Didn’t receive code?{" "}
        <span
          onClick={handleResend}
          className="font-semibold text-[#607AFB] cursor-pointer"
        >
          Resend
        </span>
      </div>
    </>
  );
}
