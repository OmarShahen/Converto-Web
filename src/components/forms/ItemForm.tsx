"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Inputs/InputField";
import SelectField from "../Inputs/SelectInputField";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";
import Button from "../buttons/Button";
import CancelButton from "../buttons/CancelButton";
import TextAreaInput from "../Inputs/TextAreaInput";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type ModalProps = {
  onClose: () => void;
  onReload: () => void;
  isUpdate?: boolean;
  target?: any;
};

export const ItemFormModal: React.FC<ModalProps> = ({
  onClose,
  onReload,
  isUpdate,
  target,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState(isUpdate ? target.name : "");
  const [price, setPrice] = useState(isUpdate ? target.price : "");
  const [stock, setStock] = useState(isUpdate ? target.stock : "");
  const [description, setDescription] = useState(
    isUpdate ? target.description : ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    isUpdate ? target.categoryId : ""
  );

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?.storeId) {
        return;
      }
      try {
        !isUpdate && setSelectedCategory("");
        const response = await serverRequest.get("/v1/categories", {
          params: { storeId: user.storeId, userId: user?._id, limit: 100 },
        });
        const categories = response.data.categories;
        let categoriesOptions = categories.map((category: any) => {
          return { label: category.name, value: category._id };
        });
        setCategories(categoriesOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [user?.storeId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return toast.error("name is required");

    if (!user?.storeId) return toast.error("store is required");

    if (!selectedCategory) return toast.error("category is required");

    if (!price) return toast.error("price is required");

    if (!stock) return toast.error("stock is required");

    if (!description) return toast.error("description is required");

    try {
      const bodyData = {
        name: name.trim(),
        price: Number.parseFloat(price),
        stock: Number.parseFloat(stock),
        description: description.trim(),
        isTrackInventory: true,
        categoryId: selectedCategory,
        storeId: user.storeId,
        userId: user?._id,
      };
      setIsLoading(true);
      const response = await serverRequest.post(`/v1/items`, bodyData);
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

    if (!selectedCategory) return toast.error("category is required");

    if (!price) return toast.error("price is required");

    if (!stock) return toast.error("stock is required");

    if (!description) return toast.error("description is required");

    try {
      const bodyData = {
        name: name.trim(),
        price: Number.parseFloat(price),
        stock: Number.parseFloat(stock),
        description: description.trim(),
        isTrackInventory: true,
        categoryId: selectedCategory,
      };
      setIsLoading(true);
      const response = await serverRequest.put(
        `/v1/items/${target._id}`,
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
          {isUpdate ? "Update Item" : "Create Item"}
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
            <SelectField
              id="category"
              name="category"
              options={categories}
              placeholder="Select Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={user?.storeId ? false : true}
            />
            <InputField
              id="price"
              type="number"
              placeholder="Price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputField
              id="stock"
              type="number"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextAreaInput
              id="description"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-right">
            <CancelButton onClick={onClose} fullWidth={false} className="mr-4">
              Cancel
            </CancelButton>
            <Button type="submit" fullWidth={false}>
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
