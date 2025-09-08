"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "@/components/Inputs/InputField";
import SelectField from "@/components/Inputs/SelectInputField";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import { ImageModal } from "@/components/ImageModal";
import Button from "@/components/buttons/Button";
import CancelButton from "@/components/buttons/CancelButton";
import { FormSkeleton } from "@/components/FormSkeleton";
import { ImageUpload } from "@/components/ImageUpload";
import { deleteImageFromFirebase } from "@/lib/firebaseStorage";

export default function ItemFormPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingItemData, setIsLoadingItemData] = useState(false);
  const [isSendingImages, setIsSendingImages] = useState(false);
  const [areImagesSaved, setAreImagesSaved] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingImagesData, setExistingImagesData] = useState<any[]>([]);
  const [isShowImageModal, setIsShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    isTrackInventory: false,
  });

  const [firebaseImageUrls, setFirebaseImageUrls] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!user?.storeId) return;

        const response = await serverRequest.get("/v1/categories", {
          params: { limit: 100, storeId: user.storeId, userId: user._id },
        });

        const categoriesOptions = response.data.categories.map(
          (category: any) => ({
            label: category.name,
            value: category._id,
          })
        );

        setCategories(categoriesOptions);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, [user?.storeId, user?._id]);

  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) {
        return;
      }

      try {
        setIsLoadingItemData(true);
        const response = await serverRequest.get(`/v1/items/${itemId}`);
        const item = response.data.item;

        const newFormData = {
          name: item.name || "",
          description: item.description || "",
          price: item.price?.toString() || "",
          stock: item.stock?.toString() || "",
          categoryId: item.categoryId || "",
          isTrackInventory: item.isTrackInventory || false,
        };
        setFormData(newFormData);

        // Set existing images if any
        if (item.images && item.images.length > 0) {
          // Extract URLs from image objects
          const imageUrls = item.images.map((image: any) => image.url);
          setExistingImages(imageUrls);
          setExistingImagesData(item.images);
          setAreImagesSaved(true); // Images are already saved if they exist
        } else {
          setExistingImages([]);
          setExistingImagesData([]);
          setAreImagesSaved(false);
        }

        setIsLoadingItemData(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load item data");
        setIsLoadingItemData(false);
      }
    };

    fetchItemData();
  }, []);

  const handleImageUpload = (files: File[]) => {
    setUploadedImages((prev) => [...prev, ...files]);
  };

  const handleFirebaseUpload = (urls: string[]) => {
    setFirebaseImageUrls((prev) => [...prev, ...urls]);
    // Clear uploaded files since they're now in Firebase
    setUploadedImages([]);
    // Mark images as not saved since new images were added
    setAreImagesSaved(false);
  };

  const handleSendImagesToBackend = async () => {
    try {
      setIsSendingImages(true);

      const allImageUrls = [...existingImages, ...firebaseImageUrls];

      if (allImageUrls.length === 0) {
        toast.error("No images to send");
        setIsSendingImages(false);
        return;
      }

      if (!itemId) {
        toast.error("Please save the item first before adding images");
        setIsSendingImages(false);
        return;
      }

      const payload = { images: allImageUrls };
      const response = await serverRequest.post(
        `/v1/items/${itemId}/images`,
        payload
      );

      toast.success(response.data.message);
      setAreImagesSaved(true);
      setIsSendingImages(false);
    } catch (error: any) {
      console.error("Failed to send images:", error);
      toast.error(error?.response?.data?.message || "Failed to send images");
      setIsSendingImages(false);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (index: number) => {
    const imageUrl = existingImages[index];

    try {
      // Only delete from Firebase if it's a Firebase URL
      if (imageUrl.includes("firebasestorage.googleapis.com")) {
        await deleteImageFromFirebase(imageUrl);
        toast.success("Image deleted from storage");
      }

      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      // Mark images as not saved since changes were made
      setAreImagesSaved(false);
      // Notify user to save changes
      if (imageUrl.includes("firebasestorage.googleapis.com")) {
        toast.success(
          "Image deleted! Click 'Save Images' to update your item."
        );
      }
    } catch (error) {
      console.error("Failed to delete image from Firebase:", error);
      toast.error("Failed to delete image from storage");
    }
  };

  const removeFirebaseImage = async (index: number) => {
    const imageUrl = firebaseImageUrls[index];

    try {
      await deleteImageFromFirebase(imageUrl);
      setFirebaseImageUrls((prev) => prev.filter((_, i) => i !== index));
      toast.success("Image deleted! Click 'Save Images' to update your item.");
      // Mark images as not saved since changes were made
      setAreImagesSaved(false);
    } catch (error) {
      console.error("Failed to delete image from Firebase:", error);
      toast.error("Failed to delete image from storage");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      let itemData = {
        userId: !itemId ? user?._id : undefined,
        storeId: !itemId ? user?.storeId : undefined,
        categoryId: formData.categoryId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        stock: Number.parseFloat(formData.stock),
        isTrackInventory: formData.isTrackInventory,
      };

      const url = itemId ? `/v1/items/${itemId}` : `/v1/items`;
      const method = itemId ? "put" : "post";
      const response = await serverRequest[method](url, itemData);

      // If creating a new item, update URL with the new item ID
      if (!itemId && response.data.item?._id) {
        const newItemId = response.data.item._id;
        router.replace(`/app/items/form?id=${newItemId}`, { scroll: false });
      }

      toast.success(response.data.message);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Please try again later");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/app/items");
  };

  // Get all images (existing + uploaded + firebase) for navigation
  const getAllImages = () => {
    const allImages: string[] = [];
    existingImages.forEach((url) => allImages.push(url));
    firebaseImageUrls.forEach((url) => allImages.push(url));
    uploadedImages.forEach((file) => allImages.push(URL.createObjectURL(file)));
    return allImages;
  };

  const handleImageClick = (imageUrl: string) => {
    const allImages = getAllImages();
    const index = allImages.indexOf(imageUrl);
    setSelectedImageIndex(index >= 0 ? index : 0);
    setIsShowImageModal(true);
  };

  return (
    <div>
      <ImageModal
        isOpen={isShowImageModal}
        onClose={() => setIsShowImageModal(false)}
        images={getAllImages()}
        initialIndex={selectedImageIndex}
      />

      <SectionHeader
        title={itemId ? "Edit Item" : "Create Item"}
        showBackButton
        onBackClick={handleCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Item Information */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Item Information
            </h3>

            {isLoadingItemData && itemId ? (
              <FormSkeleton />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                id="item-form"
              >
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <InputField
                      label="Item Name"
                      name="name"
                      placeholder="Enter item name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                    />
                  </div>

                  <div>
                    <SelectField
                      label="Category"
                      id="categoryId"
                      name="categoryId"
                      placeholder="Select category"
                      options={categories}
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      error={errors.categoryId}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <TextAreaInput
                      label="Description"
                      id="description"
                      name="description"
                      placeholder="Enter item description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      error={errors.description}
                      required
                    />
                  </div>

                  {/* Price and Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <InputField
                        label="Price"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        error={errors.price}
                        required
                      />
                    </div>

                    <div>
                      <InputField
                        label="Stock Quantity"
                        name="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleInputChange}
                        error={errors.stock}
                        required
                      />
                    </div>
                  </div>

                  {/* Track Inventory */}
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="isTrackInventory"
                        checked={formData.isTrackInventory}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#607AFB] focus:ring-[#607AFB] border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Track inventory for this item
                      </span>
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      Enable this to automatically track stock levels and
                      receive low stock alerts
                    </p>
                  </div>
                </div>
              </form>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
              <CancelButton
                fullWidth={false}
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </CancelButton>
              <Button
                fullWidth={false}
                type="submit"
                form="item-form"
                disabled={isLoading}
                className="px-6 py-2 bg-[#607AFB] text-white rounded-md hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading
                  ? "Saving..."
                  : itemId
                  ? "Update Item"
                  : "Create Item"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div>
          <ImageUpload
            uploadedImages={uploadedImages}
            existingImages={[...existingImages, ...firebaseImageUrls]}
            existingImagesData={[...existingImagesData, ...firebaseImageUrls.map(url => ({ url, description: "Recently uploaded to Firebase", createdAt: new Date().toISOString() }))]}
            onImageUpload={handleImageUpload}
            onRemoveUploadedImage={removeUploadedImage}
            onRemoveExistingImage={async (index) => {
              const allExistingImages = [
                ...existingImages,
                ...firebaseImageUrls,
              ];
              const imageUrl = allExistingImages[index];

              // Check if it's a Firebase image and remove from appropriate array
              if (firebaseImageUrls.includes(imageUrl)) {
                const firebaseIndex = firebaseImageUrls.indexOf(imageUrl);
                await removeFirebaseImage(firebaseIndex);
              } else {
                const existingIndex = existingImages.indexOf(imageUrl);
                await removeExistingImage(existingIndex);
              }
            }}
            onImageClick={handleImageClick}
            onFirebaseUpload={handleFirebaseUpload}
            title="Item Images"
            maxSize={5}
            acceptedTypes={[
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/gif",
              "image/webp",
            ]}
            storagePath={`items/${user?.storeId || "default"}`}
            enableFirebaseUpload={true}
            actionButton={{
              label: !itemId
                ? "Create Item First"
                : isSendingImages
                ? "Saving..."
                : "Save Images",
              onClick: handleSendImagesToBackend,
              disabled: !itemId || isSendingImages,
            }}
          />
        </div>
      </div>
    </div>
  );
}
