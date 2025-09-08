"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import ToggleSwitch from "@/components/ToggleSwitch";
import { serverRequest } from "@/lib/axios";
import {
  RETURN_CONDITIONS_VALUES,
  RETURN_SHIPPING_PAYER_VALUES,
  REFUND_TYPES_VALUES,
} from "@/utils/values";

const StoreFormRefundPolicy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const [formData, setFormData] = useState({
    isReturnable: true,
    returnDays: "",
    returnShippingPayer: "",
    returnConditions: [] as string[],
    refundTypes: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const data = response.data.store.returnPolicy;
        if (data) {
          setFormData({
            isReturnable: data.isReturnable ?? true,
            returnDays: data.returnDays?.toString() ?? "",
            returnShippingPayer: data.returnShippingPayer ?? "",
            returnConditions: data.returnConditions ?? [],
            refundTypes: data.refundTypes ?? [],
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to load store");
      }
    };

    if (storeId && isUpdate) fetchStore();
  }, [storeId, isUpdate]);

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
      const response = await serverRequest.put(
        `/v1/stores/${storeId}`,
        storeData
      );
      isUpdate
        ? toast.success(response.data.message)
        : router.push(`/app/stores/form/payment-methods?storeId=${storeId}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-sm">Return Available</label>
            <div className="mt-1">
              <ToggleSwitch
                id="isReturnable"
                checked={formData.isReturnable}
                onChange={(e) => handleChange("isReturnable", e.target.checked)}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Return Days</label>
            <InputField
              id="returnDays"
              type="number"
              placeholder="e.g., 14"
              value={formData.returnDays}
              onChange={(e) => handleChange("returnDays", e.target.value)}
              disabled={!formData.isReturnable}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Return Shipping Payer
            </label>
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

          <div>
            <label className="font-semibold text-sm">Return Conditions</label>
            <MultiSelectInputField
              id="returnConditions"
              options={RETURN_CONDITIONS_VALUES}
              value={formData.returnConditions}
              placeholder="Select Conditions"
              onChange={(vals) => handleChange("returnConditions", vals)}
              disabled={!formData.isReturnable}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Refund Types</label>
            <MultiSelectInputField
              id="refundTypes"
              options={REFUND_TYPES_VALUES}
              value={formData.refundTypes}
              placeholder="Select Types"
              onChange={(vals) => handleChange("refundTypes", vals)}
              disabled={!formData.isReturnable}
            />
          </div>
        </div>

        <div className="text-right mt-8">
          <CancelButton
            onClick={() => router.back()}
            fullWidth={false}
            className="mr-4"
          >
            Back
          </CancelButton>
          <Button type="submit" fullWidth={false}>
            {isLoading
              ? isUpdate
                ? "Updating..."
                : "Submitting..."
              : isUpdate
              ? "Update"
              : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreFormRefundPolicy;
