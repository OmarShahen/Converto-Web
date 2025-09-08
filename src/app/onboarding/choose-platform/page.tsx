"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import StepsProgressBar from "@/components/StepsProgressBar";
import { PlatformOption } from "@/components/PlatformOptions";
import { MessengerIcon } from "@/components/icons/messenger";
import { InstagramIcon } from "@/components/icons/instagram";

export default function OnboardingChoosePlatformPage() {
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
        <StepsProgressBar currentStep={2} totalSteps={4} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          Select Your Integration Platform
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Choose the platform where you want to connect your chatbot for
          seamless sales and support.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <PlatformOption
          onClick={() => handleChange("platform", "facebook")}
          isActive={formData.platform === "facebook" ? true : false}
          header="Facebook Messenger"
          text="Create Facebook Messenger automation to keep customers happy."
          icon={<MessengerIcon height="42" width="42" />}
        />
        <PlatformOption
          onClick={() => handleChange("platform", "instagram")}
          isActive={formData.platform === "instagram" ? true : false}
          header="Instagram"
          text="Supercharge your social media marketing with Instagram Automation."
          icon={<InstagramIcon height="42" width="42" />}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Next"}
        </Button>
      </form>
    </>
  );
}
