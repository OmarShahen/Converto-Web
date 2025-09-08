"use client";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import InputField from "@/components/Inputs/InputField";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";

const StoreFormShippingPolicy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const [formData, setFormData] = useState({
    isShipping: true,
    shippingDays: "",
    shippingCost: "",
    freeShippingOver: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (formData.isShipping && !formData.shippingDays)
      return "Shipping days is required";
    if (formData.isShipping && !formData.shippingCost)
      return "Shipping cost is required";
    return null;
  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const store = response.data.store;
        setFormData({
          isShipping: store?.shippingPolicy.isShipping || "",
          shippingDays: store?.shippingPolicy.shippingDays || "",
          shippingCost: store?.shippingPolicy.shippingCost || "",
          freeShippingOver: store?.shippingPolicy.freeShippingOver || "",
        });
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "please try again");
      }
    };
    if (storeId) {
      fetchStore();
    }
  }, [storeId]);

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
      const response = await serverRequest.put(`/v1/stores/${storeId}`, {
        shippingPolicy,
      });
      isUpdate
        ? toast.success(response.data.message)
        : router.push(`/app/stores/form/refund-policy?storeId=${storeId}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-sm">Shipping Available</label>
            <div className="mt-1">
              <ToggleSwitch
                id="isShipping"
                checked={formData.isShipping}
                onChange={(e) => handleChange("isShipping", e.target.checked)}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-sm">Shipping Days</label>
            <InputField
              id="shippingDays"
              type="number"
              placeholder="e.g., 5"
              value={formData.shippingDays}
              onChange={(e) => handleChange("shippingDays", e.target.value)}
              disabled={!formData.isShipping}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Shipping Cost</label>
            <InputField
              id="shippingCost"
              type="number"
              placeholder="e.g., 50"
              value={formData.shippingCost}
              onChange={(e) => handleChange("shippingCost", e.target.value)}
              disabled={!formData.isShipping}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Free Shipping Over</label>
            <InputField
              id="freeShippingOver"
              type="number"
              placeholder="e.g., 500"
              value={formData.freeShippingOver}
              onChange={(e) => handleChange("freeShippingOver", e.target.value)}
              disabled={!formData.isShipping}
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
                : "Creating..."
              : isUpdate
              ? "Update"
              : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreFormShippingPolicy;
