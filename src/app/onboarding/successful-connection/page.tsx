"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import StepsProgressBar from "@/components/StepsProgressBar";
import { PlatformOption } from "@/components/PlatformOptions";
import { MessengerIcon } from "@/components/icons/messenger";

export default function OnboardingConnectionPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ platform: "" });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.platform) {
      return toast.error("Platform is required");
    }

    router.push("/onboarding/grant-permission");
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={4} totalSteps={4} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          🎉 Facebook Pages Connected Successfully!
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Your Facebook pages are now linked. You’re all set to start building
          your store or manage it from your dashboard.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Button
          type="button"
          disabled={isLoading}
          onClick={() => router.push("/onboarding/store/basic-info")}
        >
          Build My Store
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          className="border-[#607AFB]! border-2 bg-white! text-[#607AFB]!"
          onClick={() => router.push("/app/dashboard")}
        >
          Go to Dashboard
        </Button>
      </form>
    </>
  );
}
