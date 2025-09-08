"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { Bot, MessageCircleMore, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { SearchFilter } from "@/components/Inputs/SearchFilter";
import { SearchFilterWrapper } from "@/components/SearchFilterWrapper";
import { DeleteModal } from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MessengerIcon } from "@/components/icons/messenger";
import { truncateText } from "@/utils/text-formatter";
import { useParams } from "next/navigation";
import { Message } from "@/components/Chats/Message";
import CircularLoading from "@/components/Loader";

export default function ChatMessagesPage() {
  const user = useSelector((state: RootState) => state.user.user);

  const params = useParams();
  const { id } = params;

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          page,
          limit,
          chatId: id,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/messages", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.messages);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchData();
  }, [page, limit, reload]);

  return (
    <div>
      <SectionHeader title="Chat Messages" total={total} />
      {isLoading ? (
        <CircularLoading />
      ) : (
        <div className="bg-white shadow rounded-sm">
          {data.map((message) => {
            return (
              <div className="border-b border-[#E5E7EB]">
                <Message messageData={message} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
