"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import { serverRequest } from "@/lib/axios";
import { CURRENCIES_VALUES, PAYMENT_METHODS_VALUES } from "@/utils/values";
import SelectField from "@/components/Inputs/SelectInputField";

const StoreFormPaymentMethods = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const [formData, setFormData] = useState({
    paymentMethods: [] as string[],
    currency: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const data = response.data.store;
        if (data) {
          setFormData({
            paymentMethods: data.paymentMethods ?? [],
            currency: data.currency ?? "",
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
    const { paymentMethods, currency } = formData;

    try {
      if (paymentMethods.length === 0)
        return toast.error("Payment methods are required");

      if (!currency) return toast.error("Currency is required");

      const storeData = { paymentMethods, currency };

      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/stores/${storeId}`,
        storeData
      );
      setIsLoading(false);
      isUpdate
        ? toast.success(response.data.message)
        : router.push(`/app/stores/form/integrations?storeId=${storeId}`);
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
            <label className="font-semibold text-sm">Payment Methods</label>
            <MultiSelectInputField
              id="paymentMethods"
              options={PAYMENT_METHODS_VALUES}
              value={formData.paymentMethods}
              placeholder="Select Methods"
              onChange={(vals) => handleChange("paymentMethods", vals)}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Currency</label>
            <SelectField
              id="currency"
              name="currency"
              options={CURRENCIES_VALUES}
              placeholder="Select Currency"
              value={formData.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
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
              : "Finish"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreFormPaymentMethods;
