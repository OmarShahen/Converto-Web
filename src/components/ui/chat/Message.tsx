import { User, Bot, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import React from "react";

interface MessageProps {
  content: string;
  role: string;
  timestamp: Date;
}

const formatDate = (date: Date) => {
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return timeString;
};

// Function to detect image URLs in text
const extractImageUrls = (text: string): string[] => {
  const imageUrlRegex =
    /https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?[^\s]*)?/gi;
  return text.match(imageUrlRegex) || [];
};

// Function to check if a URL is an image
const isImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(url);
};

// Component for displaying images in chat
const ChatImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="my-2">
      {!imageError ? (
        <div className="relative inline-block">
          <img
            src={src}
            alt={alt}
            className={`max-w-full max-h-64 rounded-lg border border-gray-200 shadow-sm cursor-pointer transition-opacity ${
              imageLoaded ? "opacity-100" : "opacity-50"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={() => window.open(src, "_blank")}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-pulse text-gray-500 text-sm">
                Loading image...
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-600">
          <ExternalLink size={16} />
          <span className="text-sm">Failed to load image</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View link
          </a>
        </div>
      )}
    </div>
  );
};

export const Message = ({ content, role, timestamp }: MessageProps) => {
  const imageUrls = extractImageUrls(content);
  const hasImages = imageUrls.length > 0;

  const renderContent = () => {
    if (hasImages) {
      let processedContent = content;
      const renderedImages: React.JSX.Element[] = [];

      imageUrls.forEach((url, index) => {
        const imagePlaceholder = `[IMAGE_${index}]`;
        processedContent = processedContent.replace(url, imagePlaceholder);
        renderedImages.push(
          <ChatImage key={url} src={url} alt={`Image ${index + 1}`} />
        );
      });

      const parts = processedContent.split(/(\[IMAGE_\d+\])/);

      return (
        <>
          {parts.map((part, index) => {
            const imageMatch = part.match(/\[IMAGE_(\d+)\]/);
            if (imageMatch) {
              const imageIndex = parseInt(imageMatch[1]);
              return renderedImages[imageIndex];
            }
            return part.trim() ? (
              <ReactMarkdown key={index}>{part}</ReactMarkdown>
            ) : null;
          })}
        </>
      );
    }

    return <ReactMarkdown>{content}</ReactMarkdown>;
  };

  return (
    <div
      className={`flex items-end md:gap-2 gap-1 p-2 ${
        role === "user" ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      <div
        className={`shadow flex items-center justify-center rounded-full ${
          role === "assistant"
            ? "bg-[#f0f3f4] w-10 h-10"
            : "text-white bg-[#607AFB] w-10 h-10"
        }`}
      >
        {role === "user" ? (
          <User className="size-5" />
        ) : (
          <Bot className="size-5" />
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[80%]">
        <p className="text-[#637c88] text-sm font-normal">
          {role === "user" ? "Customer" : "Bot"}
        </p>
        <div
          className={`shadow text-left inline-block w-fit break-words rounded-xl px-4 py-3 text-base font-normal ${
            role === "assistant"
              ? "text-[#111518] bg-[#f0f3f4]"
              : "text-white bg-[#607AFB]"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
