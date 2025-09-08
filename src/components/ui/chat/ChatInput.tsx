"use client";

import { useRef, useState } from "react";
import { Send, Paperclip, X, Upload } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { uploadMultipleImages } from "@/lib/firebaseStorage";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: any) => void;
  isTyping?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onFileUpload?: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

export const ChatInput = ({
  message,
  setMessage,
  onSubmit,
  isTyping = false,
  placeholder = "Ask me anything...",
  disabled = false,
  onFileUpload,
  maxFiles = 5,
  acceptedFileTypes = ["image/*"],
}: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  
  const user = useSelector((state: RootState) => state.user.user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (disabled || isTyping) return;
    
    onSubmit(e);
    
    // Clear attached files after submit
    setAttachedFiles([]);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    if (files.length > 0) {
      setUploadingFiles(true);
      
      try {
        // Upload images to Firebase and get URLs
        const storagePath = `chat/${user?.storeId || 'default'}`;
        const imageUrls = await uploadMultipleImages(files, storagePath);
        
        // Add image URLs to the message
        const currentMessage = message;
        const imageUrlsText = imageUrls.join('\n');
        const newMessage = currentMessage ? `${currentMessage}\n${imageUrlsText}` : imageUrlsText;
        setMessage(newMessage);
        
        toast.success(`${files.length} image(s) uploaded successfully`);
      } catch (error) {
        console.error('Failed to upload images:', error);
        toast.error('Failed to upload images to Firebase');
      } finally {
        setUploadingFiles(false);
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);
    onFileUpload?.(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Attached Files Display */}
      {attachedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
            >
              <span className="text-gray-700 truncate max-w-32">
                {file.name}
              </span>
              <span className="text-gray-500 text-xs">
                ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center rounded-xl bg-white px-3 py-4 relative shadow">
        {/* File Upload Button */}
        {onFileUpload && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || attachedFiles.length >= maxFiles || uploadingFiles}
            className="mr-2 p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Attach files"
          >
            {uploadingFiles ? (
              <Upload className="w-4 h-4 text-[#607AFB] animate-pulse" />
            ) : (
              <Paperclip className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Text Input */}
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          placeholder={placeholder}
          disabled={disabled || isTyping}
          className="w-full resize-none overflow-hidden border-none text-base text-[#121516] placeholder:text-[#6a7981] focus:outline-none leading-[1.6] pr-10 disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={disabled || isTyping || (!message.trim() && attachedFiles.length === 0)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#607AFB] flex items-center justify-center cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F46E5] transition-colors"
        >
          {isTyping ? (
            <PuffLoader color="#FFF" size={20} />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};