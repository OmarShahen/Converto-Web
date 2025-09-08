"use client";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import { STORE_CATEGORY_VALUES } from "@/utils/values";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const StoreFormBasicInfo = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const store = response.data.store;
        setFormData({
          name: store.name || "",
          category: store.category || "",
          phoneNumber: store.phone?.toString() || "",
          email: store.email || "",
          description: store.description || "",
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      router.push(
        `/app/stores/form/assistant-setup?storeId=${response.data.store._id}`
      );
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.name) return toast.error("name is required");
      if (!formData.category) return toast.error("category is required");
      if (!formData.phoneNumber) return toast.error("phone number is required");
      if (!formData.email) return toast.error("email is required");
      if (!formData.description) return toast.error("description is required");

      const storeData = {
        name: formData.name.trim(),
        category: formData.category,
        phone: Number.parseInt(formData.phoneNumber),
        email: formData.email.toLowerCase().trim(),
        description: formData.description.trim(),
      };

      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/stores/${storeId}`,
        storeData
      );
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again");
    }
  };

  return (
    <div>
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-sm">Store Name</label>
            <InputField
              id="name"
              type="text"
              placeholder="e.g., Styld Fashion Store"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Store Category</label>
            <SelectField
              id="category"
              name="category"
              options={STORE_CATEGORY_VALUES}
              placeholder="Select Category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Phone Number</label>
            <InputField
              id="phoneNumber"
              type="tel"
              placeholder="e.g., 01065630331"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Email</label>
            <InputField
              id="email"
              type="email"
              placeholder="e.g., store@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="font-semibold text-sm">Store Description</label>
          <TextAreaInput
            id="description"
            placeholder="Tell customers what your store is about"
            name="description"
            rows={10}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="text-right mt-4">
          <CancelButton
            onClick={() => router.push("/stores")}
            fullWidth={false}
            className="mr-4"
          >
            Cancel
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

export default StoreFormBasicInfo;
