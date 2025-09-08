"use client";
import { Message } from "@/components/ui/chat/Message";
import { useEffect, useRef, useState } from "react";
import { TypingIndicator } from "@/components/ui/chat/TypingLoader";
import { ChatInput } from "@/components/ui/chat/ChatInput";
import { serverRequest } from "@/lib/axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Message = {
  content: string;
  role: string;
  timestamp: Date;
};

const ChatPlaygroundPage = () => {
  const searchParams = useSearchParams();

  const user = useSelector((state: RootState) => state.user.user);

  const storeId = user?.storeId;

  const suggestedQuestions: string[] = [
    "What are your best offers today?",
    "Can I return a product?",
    "How long does delivery take?",
    "Do you offer cash on delivery?",
  ];

  //const suggestedQuestions: string[] = [];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [threadId, setThreadId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setThreadId("");
    setMessages([]);
  }, [user?.storeId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!storeId) {
      return toast.error("Choose a store to chat with");
    }

    try {
      if (!message.trim()) return;
      const userMessage = message;
      setMessages((prev) => [
        ...prev,
        { content: message.trim(), role: "user", timestamp: new Date() },
      ]);
      setMessage("");
      setAttachedFiles([]); // Clear attached files after sending

      const askData = {
        message: userMessage,
        threadId,
        storeId,
        files: attachedFiles.length > 0 ? attachedFiles : undefined,
      };
      setIsTyping(true);
      const response = await serverRequest.post("/v1/assistant/ask", askData);
      setIsTyping(false);
      const data = response.data;
      const reply = data.message;
      setThreadId(data.threadId);

      setMessages((prev) => [
        ...prev,
        { content: reply, role: "assistant", timestamp: new Date() },
      ]);
    } catch (error: any) {
      setIsTyping(false);
      console.error(error);
      const reply = error?.response?.data?.message || "there was an error";
      setMessages((prev) => [
        ...prev,
        { content: reply, role: "assistant", timestamp: new Date() },
      ]);
    }
  };

  const getLastUserMessageIndex = () => {
    return messages
      .map((m, i) => ({ role: m.role, i }))
      .filter((m) => m.role === "user")
      .at(-1)?.i;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pb-32">
        <div className="text-center py-2">
          <h1 className="text-[#121516] text-[1.5rem] md:text-[2rem] font-bold pb-3 pt-5 px-2">
            Test Your Store's
            <span className="text-[#607AFB]"> AI Assistant</span>
          </h1>
          <h5 className="text-[#6E7787]">
            This chatbot is your smart sales & support agent. It will answer
            customer questions on your behalf.
          </h5>
        </div>
        <div className="relative z-5">
          <h5 className="text-[#121516] text-lg font-semibold px-4 pb-2 pt-2">
            Suggested Questions
          </h5>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setMessage(question);
                }}
                className="relative z-20 shadow flex h-auto py-2 px-4 max-w-full flex-wrap shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#F1F3F4] hover:bg-[#E5E7EB] hover:shadow-md transition-all duration-200 border-none outline-none cursor-pointer"
                style={{ pointerEvents: "auto" }}
              >
                <span className="text-[#121516] text-xs md:text-sm font-medium break-words whitespace-normal">
                  {question}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                ref={
                  index === getLastUserMessageIndex() ? bottomRef : undefined
                }
              >
                {message.content && (
                  <Message
                    content={message.content}
                    role={message.role}
                    timestamp={message.timestamp}
                  />
                )}
              </div>
            );
          })}
          {isTyping && <TypingIndicator />}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 md:left-48 lg:left-64 right-0 px-4 sm:px-12 md:px-20 lg:px-64 py-4 z-10">
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          isTyping={isTyping}
          placeholder="Ask me anything..."
          onFileUpload={setAttachedFiles}
          maxFiles={5}
          acceptedFileTypes={["image/*", ".pdf", ".txt", ".doc", ".docx"]}
        />
      </div>
    </div>
  );
};

export default ChatPlaygroundPage;
