"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import { serverRequest } from "@/lib/axios";
import SelectField from "@/components/Inputs/SelectInputField";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const StoreFormIntegrations = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");
  const isUpdate = mode === "UPDATE";

  const user = useSelector((state: RootState) => state.user.user);

  const [facebookPages, setFacebookPages] = useState([]);
  const [instagramPages, setInstagramPages] = useState([]);
  const [formData, setFormData] = useState({
    facebookId: "",
    instagramId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await serverRequest.get(`/v1/stores/${storeId}`);
        const data = response.data.store;
        if (data) {
          setFormData({
            facebookId: data.facebookId || "",
            instagramId: data.instagramId || "",
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to load store");
      }
    };

    if (storeId && isUpdate) fetchStore();
  }, [storeId, isUpdate]);

  useEffect(() => {
    const fetchFacebookPages = async () => {
      try {
        const params = {
          params: { userId: user?._id, platform: "facebook", limit: 100 },
        };
        const response = await serverRequest.get(`/v1/channels`, params);
        const facebookPages = response.data.channels;
        const facebookPagesOptions = facebookPages.map((facebookPage: any) => {
          return { label: facebookPage.name, value: facebookPage.pageId };
        });
        setFacebookPages(facebookPagesOptions);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to load");
      }
    };

    fetchFacebookPages();
  }, []);

  useEffect(() => {
    const fetchInstagramPages = async () => {
      try {
        const params = {
          params: { userId: user?._id, platform: "instagram", limit: 100 },
        };
        const response = await serverRequest.get(`/v1/channels`, params);
        const instagramPages = response.data.channels;
        const instagramPagesOptions = instagramPages.map(
          (instagramPage: any) => {
            return { label: instagramPage.name, value: instagramPage.pageId };
          }
        );
        setInstagramPages(instagramPagesOptions);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to load");
      }
    };

    fetchInstagramPages();
  }, []);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { facebookId, instagramId } = formData;

    try {
      const storeData = {
        facebookId: facebookId ? Number.parseInt(facebookId) : "",
        instagramId: instagramId ? Number.parseInt(instagramId) : "",
      };

      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/stores/${storeId}`,
        storeData
      );
      setIsLoading(false);
      isUpdate
        ? toast.success(response.data.message)
        : router.push(`/app/stores`);
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
            <label className="font-semibold text-sm">Facebook Page</label>
            <SelectField
              id="facebookId"
              name="facebookId"
              options={facebookPages}
              placeholder="Select Facebook Page"
              value={formData.facebookId}
              onChange={(e) => handleChange("facebookId", e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Instagram Page</label>
            <SelectField
              id="instagramId"
              name="instagramId"
              options={instagramPages}
              placeholder="Select Instagram Page"
              value={formData.instagramId}
              onChange={(e) => handleChange("instagramId", e.target.value)}
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

export default StoreFormIntegrations;
