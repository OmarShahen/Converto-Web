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
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import SelectField from "@/components/Inputs/SelectInputField";
import { STORE_CATEGORY_VALUES } from "@/utils/values";
import { InputLabel } from "@/components/Inputs/InputLabel";

export default function OnboardingStoreBasicInfoPage() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.name) return toast.error("name is required");
      if (!formData.category) return toast.error("category is required");
      if (!formData.phoneNumber) return toast.error("phone number is required");
      if (!formData.email) return toast.error("email is required");
      if (!formData.description) return toast.error("description is required");

      const storeData = {
        userId: user?._id,
        name: formData.name.trim(),
        category: formData.category,
        phone: Number.parseInt(formData.phoneNumber),
        email: formData.email.toLowerCase().trim(),
        description: formData.description.trim(),
      };

      setIsLoading(true);
      const response = await serverRequest.post("/v1/stores", storeData);
      setIsLoading(false);
      const storeId = response.data.store._id;

      router.push(`/onboarding/store/${storeId}/payment-method`);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again");
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={1} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          🛍️ Let’s Set Up Your Store’s Essentials
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Add your store name, contact details, and other basic information so
          customers know who you are and how to reach you.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="name">Store Name</InputLabel>
          <InputField
            id="name"
            type="text"
            placeholder="e.g., Styld Fashion Store"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="category">Store Category</InputLabel>
          <SelectField
            id="category"
            name="category"
            options={STORE_CATEGORY_VALUES}
            placeholder="Select Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="phone">Store Phone</InputLabel>
          <InputField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="e.g., 201065630331"
            autoComplete="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="email">Store Email</InputLabel>
          <InputField
            id="email"
            type="email"
            placeholder="e.g., store@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="description">Store Description</InputLabel>
          <TextAreaInput
            id="description"
            placeholder="Tell customers what your store is about"
            name="description"
            rows={10}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Next"}
        </Button>
      </form>
    </>
  );
}
