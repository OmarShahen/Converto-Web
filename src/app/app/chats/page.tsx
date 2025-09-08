"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { AppWindow, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { InstagramIcon } from "@/components/icons/instagram";
import { WebIcon } from "@/components/icons/web";

export default function ChatsPage() {
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();

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
        const response = await serverRequest.get("/v1/chats", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.chats);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [user?.storeId, page, limit, reload]);

  const deleteData = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serverRequest.delete(`/v1/chats/${id}`);
      setReload(reload + 1);
      setIsDeleting(false);
      setIsShowDeleteModal(false);
      toast.success(response.data.message);
    } catch (error: any) {
      setIsDeleting(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "please try again later");
    }
  };

  const handleDelete = async (row: any) => {
    setTarget(row);
    setIsShowDeleteModal(true);
  };

  const handlePageChange = (page: any) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: any, page: any) => {
    setLimit(newRowsPerPage);
  };

  const onClose = () => {
    setIsShowFormModal(false);
    setIsUpdate(false);
    setTarget({ _id: "", name: "Chat" });
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

  const handleRowClicked = (row: any) => {
    router.push(`/app/chats/${row._id}/messages`);
  };

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row: any) => `#${row.chatId}`,
    },
    {
      name: "Store",
      selector: (row: any) => row?.store?.name,
    },
    {
      name: "Page",
      selector: (row: any) =>
        row?.channel?.name ? row?.channel?.name : "Playground",
    },
    {
      name: "Platform",
      selector: (row: any) => <div>{getPlatformIcon(row.platform)}</div>,
    },
    {
      name: "Date",
      selector: (row: any) =>
        format(new Date(row.createdAt), "yyyy-MM-dd hh:mm a"),
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row)}
            className="p-1 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div>
      <DeleteModal
        title={`Delete ${target?.name || "Chat"}`}
        isDeleting={isDeleting}
        isOpen={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={() => deleteData(target?._id)}
      />

      <SectionHeader title="Chats" total={total} />
      <BaseTable
        data={data}
        columns={columns}
        progressPending={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        totalRows={total}
        onRowClicked={handleRowClicked}
      />
    </div>
  );
}
