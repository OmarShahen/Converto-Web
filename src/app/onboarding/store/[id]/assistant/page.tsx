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
  ASSISTANT_LANGUAGES_VALUES,
  ASSISTANT_PERSONA_VALUES,
} from "@/utils/values";
import MultiSelectInputField from "@/components/Inputs/MultiSelectInputField";
import { InputLabel } from "@/components/Inputs/InputLabel";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";
import TextAreaInput from "@/components/Inputs/TextAreaInput";

export default function OnboardingStoreAssistantPage() {
  const router = useRouter();

  const params = useParams();
  const storeId = params.id;

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    persona: "",
    languages: [] as string[],
    instructions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      await serverRequest.put(`/v1/stores/${storeId}`, storeData);
      setIsLoading(false);
      router.push(`/onboarding/store/${storeId}/select-page`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={5} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          🤖 Set Up Your Store Assistant
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Configure your virtual assistant to help customers, answer questions,
          and boost sales.
        </h6>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="name">Assistant Name</InputLabel>
          <InputField
            id="name"
            type="text"
            placeholder="e.g., Omar Shahen"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="persona">Assistant Persona</InputLabel>
          <SelectField
            id="persona"
            name="persona"
            options={ASSISTANT_PERSONA_VALUES}
            placeholder="Select Persona"
            value={formData.persona}
            onChange={(e) => handleChange("persona", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="languages">Languages</InputLabel>
          <MultiSelectInputField
            id="languages"
            options={ASSISTANT_LANGUAGES_VALUES}
            placeholder="Select Languages"
            onChange={(vals) => handleChange("languages", vals)}
            value={formData.languages}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel htmlFor="instructions">Assistant Instructions</InputLabel>
          <TextAreaInput
            id="instructions"
            placeholder="Add custom instructions for how your assistant should respond to customers."
            name="instructions"
            rows={10}
            value={formData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Next"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isLoading}
          onClick={() =>
            router.push(`/onboarding/store/${storeId}/select-page`)
          }
        >
          Skip
        </Button>
      </form>
    </>
  );
}
