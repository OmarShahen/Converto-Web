"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Inputs/InputField";
import SelectField from "../Inputs/SelectInputField";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";
import Button from "../buttons/Button";
import CancelButton from "../buttons/CancelButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type ModalProps = {
  onClose: () => void;
  onReload: () => void;
  isUpdate?: boolean;
  target?: any;
};

export const CategoryFormModal: React.FC<ModalProps> = ({
  onClose,
  onReload,
  isUpdate,
  target,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(isUpdate ? target.name : "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return toast.error("name is required");

    try {
      const bodyData = {
        name: name.trim(),
        storeId: user?.storeId,
        userId: user?._id,
      };
      setIsLoading(true);
      const response = await serverRequest.post(`/v1/categories`, bodyData);
      onReload();
      onClose();
      toast.success(response.data?.message);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return toast.error("name is required");

    try {
      const bodyData = {
        name: name.trim(),
      };
      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/categories/${target._id}`,
        bodyData
      );
      onReload();
      onClose();
      toast.success(response.data?.message);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative mx-4 md:mx-0">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isUpdate ? "Update Category" : "Create Category"}
        </h2>
        <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-right">
            <CancelButton onClick={onClose} fullWidth={false} className="mr-4">
              Cancel
            </CancelButton>
            <Button type="submit" variant="primary" fullWidth={false}>
              {isLoading
                ? isUpdate
                  ? "Updating..."
                  : "Creating..."
                : isUpdate
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
