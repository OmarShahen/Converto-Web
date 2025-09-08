"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import StepsProgressBar from "@/components/StepsProgressBar";
import { RootState } from "@/store";
import { PAYMENT_METHODS_VALUES } from "@/utils/values";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import { InputLabel } from "@/components/Inputs/InputLabel";
import ToggleSwitch from "@/components/ToggleSwitch";
import InputField from "@/components/Inputs/InputField";

export default function OnboardingStoreShippingPolicyPage() {
  const router = useRouter();

  const params = useParams();
  const storeId = params.id;

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    isShipping: true,
    shippingDays: "",
    shippingCost: "",
    freeShippingOver: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (formData.isShipping && !formData.shippingDays)
      return "Shipping days is required";
    if (formData.isShipping && !formData.shippingCost)
      return "Shipping cost is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    const shippingPolicy = formData.isShipping
      ? {
          isShipping: true,
          shippingDays: Number.parseInt(formData.shippingDays),
          shippingCost: Number.parseFloat(formData.shippingCost),
          freeShippingOver: formData.freeShippingOver
            ? Number.parseFloat(formData.freeShippingOver)
            : 0,
        }
      : { isShipping: false };

    try {
      setIsLoading(true);
      await serverRequest.put(`/v1/stores/${storeId}`, {
        shippingPolicy,
      });
      router.push(`/onboarding/store/${storeId}/refund-policy`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={3} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          📦 Define Your Shipping Policy
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Set clear delivery timelines, costs, and coverage areas so customers
          know exactly what to expect when ordering from your store.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Shipping Available</label>
          <div className="mt-1">
            <ToggleSwitch
              id="isShipping"
              checked={formData.isShipping}
              onChange={(e) => handleChange("isShipping", e.target.checked)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="shippingDays">Shipping Days</InputLabel>
          <InputField
            id="shippingDays"
            type="number"
            placeholder="e.g., 5"
            value={formData.shippingDays}
            onChange={(e) => handleChange("shippingDays", e.target.value)}
            disabled={!formData.isShipping}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="shippingCost">Shipping Cost</InputLabel>
          <InputField
            id="shippingCost"
            type="number"
            placeholder="e.g., 50"
            value={formData.shippingCost}
            onChange={(e) => handleChange("shippingCost", e.target.value)}
            disabled={!formData.isShipping}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="freeShippingOver">Free Shipping Over</InputLabel>
          <InputField
            id="freeShippingOver"
            type="number"
            placeholder="e.g., 500"
            value={formData.freeShippingOver}
            onChange={(e) => handleChange("freeShippingOver", e.target.value)}
            disabled={!formData.isShipping}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Next"}
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          className="border-[#607AFB]! border-2 bg-white! text-[#607AFB]!"
          onClick={() =>
            router.push(`/onboarding/store/${storeId}/refund-policy`)
          }
        >
          Skip
        </Button>
      </form>
    </>
  );
}
