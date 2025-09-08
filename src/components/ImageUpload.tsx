"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { uploadMultipleImages, UploadProgress } from "@/lib/firebaseStorage";
import Button from "@/components/buttons/Button";
import ReactMarkdown from "react-markdown";

interface ImageUploadProps {
  uploadedImages: File[];
  existingImages: string[];
  existingImagesData?: any[]; // Array of image objects with descriptions
  onImageUpload: (files: File[]) => void;
  onRemoveUploadedImage: (index: number) => void;
  onRemoveExistingImage: (index: number) => void;
  onImageClick: (imageUrl: string) => void;
  onFirebaseUpload?: (urls: string[]) => void; // Called when Firebase upload completes
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  title?: string;
  storagePath?: string; // Firebase storage path
  enableFirebaseUpload?: boolean; // Whether to upload to Firebase immediately
  actionButton?: {
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  };
}

export const ImageUpload = ({
  uploadedImages,
  existingImages,
  existingImagesData,
  onImageUpload,
  onRemoveUploadedImage,
  onRemoveExistingImage,
  onImageClick,
  onFirebaseUpload,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"],
  title = "Product Images",
  storagePath = "images",
  enableFirebaseUpload = false,
  actionButton,
}: ImageUploadProps) => {
  const [uploadingFiles, setUploadingFiles] = useState<
    Map<number, UploadProgress>
  >(new Map());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Check total image limit (existing + uploaded + new files)
    const totalImages =
      existingImages.length + uploadedImages.length + files.length;
    if (totalImages > 5) {
      toast.error(
        `Maximum 5 images allowed. You can upload ${
          5 - existingImages.length - uploadedImages.length
        } more images.`
      );
      return;
    }

    const validFiles = files.filter((file) => {
      // Check if file type is supported
      const supportedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      if (!supportedTypes.includes(file.type)) {
        toast.error(
          `${file.name} is not a supported image format. Please use: PNG, JPEG, JPG, GIF, or WEBP`
        );
        return false;
      }

      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`${file.name} is too large (max ${maxSize}MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onImageUpload(validFiles);

      // Upload to Firebase if enabled
      if (enableFirebaseUpload) {
        try {
          const urls = await uploadMultipleImages(
            validFiles,
            storagePath,
            (fileIndex, progress) => {
              setUploadingFiles((prev) => {
                const newMap = new Map(prev);
                newMap.set(fileIndex, progress);
                return newMap;
              });
            }
          );

          onFirebaseUpload?.(urls);

          // Clear upload progress
          setUploadingFiles(new Map());
        } catch (error) {
          console.error("Firebase upload failed:", error);
          toast.error("Failed to upload images");
        }
      }
    }
  };

  const getFileExtensions = () => {
    return "PNG, JPEG, JPG, GIF, WEBP";
  };

  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">{title}</h3>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
            disabled={
              uploadingFiles.size > 0 ||
              existingImages.length + uploadedImages.length >= 5
            }
          />
          <label
            htmlFor="image-upload"
            className={`cursor-pointer flex flex-col items-center space-y-2 ${
              uploadingFiles.size > 0 ||
              existingImages.length + uploadedImages.length >= 5
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            {uploadingFiles.size > 0 ? (
              <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400" />
            )}
            <div className="text-sm text-gray-600">
              {uploadingFiles.size > 0 ? (
                <span className="font-medium text-[#607AFB]">
                  Uploading to Firebase...
                </span>
              ) : existingImages.length + uploadedImages.length >= 5 ? (
                <span className="font-medium text-[#607AFB]">
                  Maximum 5 images reached
                </span>
              ) : (
                <>
                  <span className="font-medium text-[#607AFB]">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {getFileExtensions()} up to {maxSize}MB each
              {enableFirebaseUpload && " (Auto-upload to Firebase)"}
            </div>
          </label>
        </div>

        {/* Images Grid */}
        <div className="space-y-4">
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Current Images
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {existingImages.map((imageUrl, index) => {
                  const imageData = existingImagesData?.[index];
                  return (
                    <div key={index} className="relative group bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg">
                      {/* Delete Button - Positioned outside the card */}
                      <button
                        type="button"
                        onClick={() => onRemoveExistingImage(index)}
                        className="absolute -top-2 -right-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                        title="Delete image"
                      >
                        <X size={12} className="stroke-2" />
                      </button>
                      
                      {/* Card content with overflow hidden */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                      
                      <div className="flex">
                        {/* Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => onImageClick(imageUrl)}
                          />
                        </div>
                        
                        {/* Description */}
                        <div className="flex-1 p-3">
                          <div className="flex flex-col h-full">
                            <div className="text-xs text-gray-500 mb-1">Description</div>
                            <div className="text-sm text-gray-900 flex-1 prose prose-sm max-w-none">
                              {imageData?.descrption || imageData?.description ? (
                                <>
                                  <ReactMarkdown
                                    components={{
                                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                      em: ({ children }) => <em className="italic">{children}</em>,
                                      ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                                      ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                                      li: ({ children }) => <li className="mb-1">{children}</li>,
                                      code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{children}</code>,
                                    }}
                                  >
                                    {expandedDescriptions.has(index) 
                                      ? (imageData?.descrption || imageData?.description)
                                      : truncateText(imageData?.descrption || imageData?.description)
                                    }
                                  </ReactMarkdown>
                                  {(imageData?.descrption || imageData?.description).length > 100 && (
                                    <button
                                      onClick={() => toggleDescription(index)}
                                      className="inline-flex items-center gap-1 text-xs text-[#607AFB] hover:text-[#4F46E5] font-medium mt-1 transition-colors"
                                    >
                                      {expandedDescriptions.has(index) ? (
                                        <>
                                          <span>Show less</span>
                                          <ChevronUp size={12} />
                                        </>
                                      ) : (
                                        <>
                                          <span>View all</span>
                                          <ChevronDown size={12} />
                                        </>
                                      )}
                                    </button>
                                  )}
                                </>
                              ) : (
                                <span className="text-gray-400 italic">No description available</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                              Added {imageData?.createdAt ? new Date(imageData.createdAt).toLocaleDateString() : 'Unknown date'}
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* New Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                New Images
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative group rounded-lg">
                    {/* Delete Button - Positioned outside overflow area */}
                    <button
                      type="button"
                      onClick={() => onRemoveUploadedImage(index)}
                      className="absolute -top-2 -right-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      title="Delete image"
                    >
                      <X size={12} className="stroke-2" />
                    </button>
                    
                    {/* Image container with overflow hidden */}
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onImageClick(URL.createObjectURL(file))}
                      />
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {file.name.length > 15
                          ? file.name.substring(0, 15) + "..."
                          : file.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state when no images */}
          {existingImages.length === 0 && uploadedImages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No images uploaded yet</p>
              <p className="text-xs">Upload images to see them here</p>
            </div>
          )}
        </div>

        {actionButton && (
          <div className="mt-4">
            <Button
              type="button"
              onClick={actionButton.onClick}
              fullWidth={true}
              variant="primary"
              className={actionButton.className}
              disabled={actionButton.disabled}
            >
              {actionButton.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
