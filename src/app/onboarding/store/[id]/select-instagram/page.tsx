"use client";
import Button from "@/components/buttons/Button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import StepsProgressBar from "@/components/StepsProgressBar";
import { PlatformOption } from "@/components/PlatformOptions";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { truncateText } from "@/utils/text-formatter";
import CircularLoading from "@/components/Loader";

export default function OnboardingStoreSelectPage() {
  const router = useRouter();

  const params = useParams();
  const storeId = params.id;

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({ pageId: "" });

  const [channels, setChannels] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInstagramPages = async () => {
      try {
        setIsPageLoading(true);
        const response = await serverRequest.get("/v1/channels", {
          params: { userId: user?._id, platform: "instagram" },
        });
        setIsPageLoading(false);
        setChannels(response.data.channels);
      } catch (error: any) {
        setIsPageLoading(false);
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchInstagramPages();
  }, []);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { pageId } = formData;

    try {
      if (channels.length === 0) {
        return router.push(`/app/dashboard?isCelebrate=true`);
      }

      if (!pageId) {
        return toast.error("Page is required");
      }

      const storeData = { instagramId: pageId };

      setIsLoading(true);
      await serverRequest.put(`/v1/stores/${storeId}`, storeData);
      router.push(`/app/dashboard?isCelebrate=true`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={7} totalSteps={7} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black flex">
          Select Your Instagram Page
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          Connect an Instagram Account linked to your Facebook Page to enable
          chatbot messaging.
        </h6>
      </div>

      {isPageLoading ? (
        <CircularLoading />
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {channels.map((channel: any) => {
            return (
              <PlatformOption
                onClick={() => handleChange("pageId", channel.pageId)}
                isActive={channel.pageId === formData.pageId ? true : false}
                header={channel.name}
                text={truncateText(
                  channel?.meta?.about ? channel?.meta?.about : "",
                  40
                )}
                icon={
                  <img
                    src={channel.imageURL}
                    alt={channel.name}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                }
              />
            );
          })}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Finish"}
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            className="border-[#607AFB]! border-2 bg-white! text-[#607AFB]!"
            onClick={() => router.push(`/app/dashboard`)}
          >
            Skip
          </Button>
        </form>
      )}
    </>
  );
}
