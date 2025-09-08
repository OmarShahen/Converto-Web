"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Button from "@/components/buttons/Button";
import InputField from "@/components/Inputs/InputField";
import { InputLabel } from "@/components/Inputs/InputLabel";
import toast from "react-hot-toast";
import { setUser } from "@/store/userSlice";
import CircularLoading from "@/components/Loader";

export default function PaymentsPage() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user.user);

  const [targetUser, setTargetUser] = useState({
    firstName: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsPageLoading(true);
      try {
        const response = await serverRequest.get(
          `/v1/users/${currentUser?._id}`
        );
        setTargetUser(response.data.user);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;

      const updateUserData = { firstName: name, phone: Number(phone) };

      const response = await serverRequest.put(
        `/v1/users/${currentUser?._id}`,
        updateUserData
      );
      const { user, message } = response.data;
      dispatch(setUser(user));
      toast.success(message);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "there was a problem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SectionHeader title="Profile" />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {isPageLoading ? (
            <CircularLoading />
          ) : (
            <form
              className="flex flex-col gap-4 shadow p-4 bg-white rounded-sm"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <InputLabel htmlFor="name">Name</InputLabel>
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Omar Reda"
                  autoComplete="name"
                  required
                  defaultValue={targetUser?.firstName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g., omar@gmail.com"
                  autoComplete="email"
                  disabled
                  defaultValue={targetUser?.email}
                />
              </div>
              <div className="flex flex-col gap-1">
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <InputField
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., 201065630331"
                  autoComplete="phone"
                  required
                  defaultValue={targetUser?.phone}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" fullWidth={false} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
