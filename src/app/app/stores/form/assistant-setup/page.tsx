"use client";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import {
  ASSISTANT_LANGUAGES_VALUES,
  ASSISTANT_PERSONA_VALUES,
} from "@/utils/values";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";
import TextAreaInput from "@/components/Inputs/TextAreaInput";

const StoreFormAssistantSetup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const [formData, setFormData] = useState({
    name: "",
    persona: "",
    languages: [] as string[],
    instructions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const store = response.data.store;
        setFormData({
          name: store?.assistance.name || "",
          persona: store?.assistance.persona || "",
          languages: store?.assistance.languages || [],
          instructions: store?.assistance.instructions || "",
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

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, persona, languages, instructions } = formData;

    if (!name.trim()) return toast.error("Name is required");
    if (!persona) return toast.error("Persona is required");
    if (languages.length === 0)
      return toast.error("Pick one language at least");

    const storeData = {
      assistance: {
        name: name.trim(),
        persona,
        languages,
        instructions,
      },
    };

    try {
      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/stores/${storeId}`,
        storeData
      );
      setIsLoading(false);
      isUpdate
        ? toast.success(response.data.message)
        : router.push(`/app/stores/form/shipping-policy?storeId=${storeId}`);
    } catch (error: any) {
      console.error(error);
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
            <label className="font-semibold text-sm">Assistant Name</label>
            <InputField
              id="name"
              type="text"
              placeholder="e.g., Omar Shahen"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Assistant Persona</label>
            <SelectField
              id="persona"
              name="persona"
              options={ASSISTANT_PERSONA_VALUES}
              placeholder="Select Persona"
              value={formData.persona}
              onChange={(e) => handleChange("persona", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Languages</label>
            <MultiSelectInputField
              id="languages"
              options={ASSISTANT_LANGUAGES_VALUES}
              placeholder="Select Languages"
              onChange={(vals) => handleChange("languages", vals)}
              value={formData.languages}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="font-semibold text-sm">
            Assistant Instructions
          </label>
          <TextAreaInput
            id="instructions"
            placeholder="Add custom instructions for how your assistant should respond to customers."
            name="instructions"
            rows={10}
            value={formData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
          />
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

export default StoreFormAssistantSetup;
