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
import clsx from "clsx";
import { InstagramIcon } from "@/components/icons/instagram";
import { WebIcon } from "@/components/icons/web";

export default function MessagesPage() {
  const user = useSelector((state: RootState) => state.user.user);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowFormModal, setIsShowFormModal] = useState(false);

  const [target, setTarget] = useState({ _id: "", name: "Chat" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          page,
          limit,
          storeId: user?.storeId,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/messages", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.messages);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [user?.storeId, page, limit, reload]);

  const handlePageChange = (page: any) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: any, page: any) => {
    setLimit(newRowsPerPage);
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === "facebook") {
      return <MessengerIcon width="25" height="25" />;
    }

    if (platform === "instagram") {
      return <InstagramIcon width="25" height="25" />;
    }

    return <WebIcon width="25" height="25" />;
  };

  const columns: TableColumn<any>[] = [
    {
      name: "Chat ID",
      selector: (row: any) => `#${row?.chat?.chatId}`,
    },
    {
      name: "Store",
      selector: (row: any) => row?.store?.name,
    },
    {
      name: "Message",
      wrap: true,
      grow: 2,
      cell: (row: any) => (
        <div className="flex">
          <MessageCircleMore size={15} />
          <span className="ml-1">{truncateText(row.content, 30)}</span>
        </div>
      ),
    },
    {
      name: "Sender",
      selector: (row: any) => (
        <div
          className={clsx(
            "rounded-full p-2",
            row.role === "user"
              ? "bg-green-100 text-green-500"
              : "bg-indigo-100 text-indigo-500"
          )}
        >
          {row.role === "user" ? <User size={20} /> : <Bot size={20} />}
        </div>
      ),
    },
    {
      name: "Platform",
      selector: (row: any) => <div>{getPlatformIcon(row?.chat?.platform)}</div>,
    },
    {
      name: "Date",
      selector: (row: any) =>
        format(new Date(row.createdAt), "yyyy-MM-dd hh:mm a"),
    },
  ];

  return (
    <div>
      <SectionHeader title="Messages" total={total} />
      <BaseTable
        data={data}
        columns={columns}
        progressPending={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        totalRows={total}
      />
    </div>
  );
}
