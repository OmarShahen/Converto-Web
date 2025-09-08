"use client";
import { truncateText } from "@/utils/text-formatter";
import clsx from "clsx";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageProps = {
  messageData: {
    role: string;
    createdAt: Date;
    content: string;
  };
};

export const Message = ({ messageData }: MessageProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div className="flex gap-3 p-4">
      <div>
        <div
          className={clsx(
            "rounded-full p-2",
            messageData.role === "user"
              ? "bg-green-100 text-green-500"
              : "bg-indigo-100 text-indigo-500"
          )}
        >
          {messageData.role === "user" ? <User size={20} /> : <Bot size={20} />}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-stretch gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <p className="text-[#282828] text-sm font-bold leading-tight">
              {messageData.role === "assistant" ? "Assistant" : "Customer"}
            </p>
            <p className="text-[#6a7981] text-xs font-normal leading-normal">
              {format(new Date(messageData.createdAt), "yyyy-MM-dd hh:mm a")}
            </p>
          </div>
          <p className="text-[#282828] text-sm font-normal">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      marginBottom: ".5rem",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {truncateText(
                messageData.content,
                isShowMore ? messageData.content.length : 100
              )}
            </ReactMarkdown>
            <div className="text-right">
              <span
                onClick={() => setIsShowMore(!isShowMore)}
                className="cursor-pointer text-[#607AFB] font-[500]"
              >
                {isShowMore ? "show less" : "show more"}
              </span>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
