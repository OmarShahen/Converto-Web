"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import StepsProgressBar from "@/components/StepsProgressBar";
import PhoneInputField from "@/components/Inputs/PhoneInputField";
import { RootState } from "@/store";
import { CURRENCIES_VALUES, PAYMENT_METHODS_VALUES } from "@/utils/values";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import { InputLabel } from "@/components/Inputs/InputLabel";
import SelectField from "@/components/Inputs/SelectInputField";

export default function OnboardingStoreBasicInfoPage() {
  const router = useRouter();

  const params = useParams();
  const storeId = params.id;

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    paymentMethods: [] as string[],
    currency: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { paymentMethods, currency } = formData;

    try {
      if (paymentMethods.length === 0)
        return toast.error("Payment methods are required");

      if (!currency) return toast.error("Currency is required");

      const storeData = { paymentMethods, currency };

      setIsLoading(true);
      await serverRequest.put(`/v1/stores/${storeId}`, storeData);
      setIsLoading(false);
      router.push(`/onboarding/store/${storeId}/shipping-policy`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={2} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          💳 Choose Your Store’s Payment Methods
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Select the payment options your customers can use at checkout to make
          their shopping experience smooth and secure.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Payment Methods
          </label>
          <MultiSelectInputField
            id="paymentMethods"
            options={PAYMENT_METHODS_VALUES}
            value={formData.paymentMethods}
            placeholder="Select Methods"
            onChange={(vals) => handleChange("paymentMethods", vals)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="currency">Currency</InputLabel>
          <SelectField
            id="currency"
            name="currency"
            options={CURRENCIES_VALUES}
            placeholder="Select Currency"
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
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
            router.push(`/onboarding/store/${storeId}/shipping-policy`)
          }
        >
          Skip
        </Button>
      </form>
    </>
  );
}
