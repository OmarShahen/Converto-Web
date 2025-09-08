"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import StepsProgressBar from "@/components/StepsProgressBar";
import { RootState } from "@/store";
import {
  PAYMENT_METHODS_VALUES,
  REFUND_TYPES_VALUES,
  RETURN_CONDITIONS_VALUES,
  RETURN_SHIPPING_PAYER_VALUES,
} from "@/utils/values";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import { InputLabel } from "@/components/Inputs/InputLabel";
import ToggleSwitch from "@/components/ToggleSwitch";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";

export default function OnboardingStoreRefundPolicyPage() {
  const router = useRouter();

  const params = useParams();
  const storeId = params.id;

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    isReturnable: true,
    returnDays: "",
    returnShippingPayer: "",
    returnConditions: [] as string[],
    refundTypes: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      isReturnable,
      returnDays,
      returnShippingPayer,
      returnConditions,
      refundTypes,
    } = formData;

    try {
      if (isReturnable) {
        if (!returnDays) return toast.error("Return days is required");
        if (!returnShippingPayer)
          return toast.error("Return shipping payer is required");
        if (returnConditions.length === 0)
          return toast.error("Return conditions are required");
        if (refundTypes.length === 0)
          return toast.error("Refund types are required");
      }

      const storeData = {
        returnPolicy: isReturnable
          ? {
              isReturnable,
              returnDays: Number(returnDays),
              returnShippingPayer,
              returnConditions,
              refundTypes,
            }
          : { isReturnable },
      };

      setIsLoading(true);
      await serverRequest.put(`/v1/stores/${storeId}`, storeData);
      router.push(`/onboarding/store/${storeId}/assistant`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={4} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          💸 Set Your Refund Policy
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Outline your refund terms to build customer trust and protect your
          business.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="isReturnable">Return Available</InputLabel>
          <div className="mt-1">
            <ToggleSwitch
              id="isReturnable"
              checked={formData.isReturnable}
              onChange={(e) => handleChange("isReturnable", e.target.checked)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="returnDays">Return Days</InputLabel>
          <InputField
            id="returnDays"
            type="number"
            placeholder="e.g., 14"
            value={formData.returnDays}
            onChange={(e) => handleChange("returnDays", e.target.value)}
            disabled={!formData.isReturnable}
          />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="returnShippingPayer">
            Return Shipping Payer
          </InputLabel>
          <SelectField
            id="returnShippingPayer"
            name="returnShippingPayer"
            options={RETURN_SHIPPING_PAYER_VALUES}
            placeholder="Select Return Shipping Payer"
            value={formData.returnShippingPayer}
            onChange={(e) =>
              handleChange("returnShippingPayer", e.target.value)
            }
            disabled={!formData.isReturnable}
          />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="returnConditions">Return Conditions</InputLabel>
          <MultiSelectInputField
            id="returnConditions"
            options={RETURN_CONDITIONS_VALUES}
            value={formData.returnConditions}
            placeholder="Select Conditions"
            onChange={(vals) => handleChange("returnConditions", vals)}
            disabled={!formData.isReturnable}
          />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="refundTypes">Refund Types</InputLabel>
          <MultiSelectInputField
            id="refundTypes"
            options={REFUND_TYPES_VALUES}
            value={formData.refundTypes}
            placeholder="Select Types"
            onChange={(vals) => handleChange("refundTypes", vals)}
            disabled={!formData.isReturnable}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Next"}
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          className="border-[#607AFB]! border-2 bg-white! text-[#607AFB]!"
          onClick={() => router.push(`/onboarding/store/${storeId}/assistant`)}
        >
          Skip
        </Button>
      </form>
    </>
  );
}
