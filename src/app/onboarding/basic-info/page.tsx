"use client";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import StepsProgressBar from "@/components/StepsProgressBar";
import PhoneInputField from "@/components/Inputs/PhoneInputField";
import { RootState } from "@/store";
import { InputLabel } from "@/components/Inputs/InputLabel";

export default function OnboardingBasicInfoPage() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({ name: "", phone: "" });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!formData.phone) {
        return toast.error("phone is required");
      }

      const userData = {
        firstName: formData.name.trim(),
        phone: Number.parseInt(formData.phone),
      };

      await serverRequest.put(`/v1/users/${user?._id}`, userData);

      router.push(`/onboarding/choose-platform`);
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
      <div className="mb-8">
        <StepsProgressBar currentStep={1} totalSteps={4} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          Let’s Start With You
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Share a few details so we can set up your account and personalize your
          experience.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="email">Name</InputLabel>
          <InputField
            id="name"
            name="name"
            type="text"
            placeholder="e.g., Omar Reda"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <InputField
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g., 201065630331"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Next"}
        </Button>
      </form>
    </>
  );
}
