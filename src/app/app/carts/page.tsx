"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { formatMoney, formatNumber } from "@/utils/numbers";
import { SearchInput } from "@/components/Inputs/SearchInput";
import { SearchFilter } from "@/components/Inputs/SearchFilter";
import { SearchFilterWrapper } from "@/components/SearchFilterWrapper";
import { DeleteModal } from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InputField from "@/components/Inputs/InputField";
import { useRouter } from "next/navigation";

export default function CartsPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchStatus, setSearchStatus] = useState("");

  const [statuses, setStatuses] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const [target, setTarget] = useState({ _id: "", name: "" });

  const CART_STATUS = [
    { label: "All", value: "" },
    { label: "Active", value: "active" },
    { label: "Converted", value: "converted" },
    { label: "Abandoned", value: "abandoned" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          page,
          limit,
          status: searchStatus,
          storeId: user?.storeId,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/carts", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.carts);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [searchStatus, user?.storeId, page, limit, reload]);

  const deleteData = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serverRequest.delete(`/v1/carts/${id}`);
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

  const handleUpdate = (row: any) => {
    router.push(`/app/items/form?id=${row._id}`);
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

  const handleCreateItem = () => {
    router.push("/app/items/form");
  };

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row: any) => `#${row.cartId}`,
    },
    {
      name: "Customer",
      selector: (row: any) => row?.customer?.name,
      grow: 2,
    },
    {
      name: "Total Items",
      selector: (row: any) => row?.items.length,
    },
    {
      name: "Total Price",
      selector: (row: any) =>
        formatMoney(row.totalPrice, "en", row?.store?.currency),
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    {
      name: "Last Update",
      selector: (row: any) =>
        format(new Date(row.lastUpdated), "yyyy-MM-dd hh:mm a"),
    },
    {
      name: "Abandoned At",
      selector: (row: any) =>
        format(new Date(row.abandonedAt), "yyyy-MM-dd hh:mm a"),
    },
    {
      name: "Converted At",
      selector: (row: any) =>
        format(new Date(row.convertedAt), "yyyy-MM-dd hh:mm a"),
    },
    {
      name: "Date",
      selector: (row: any) => format(new Date(row.createdAt), "yyyy-MM-dd"),
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
        title={`Delete ${target?.name}`}
        isDeleting={isDeleting}
        isOpen={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={() => deleteData(target?._id)}
      />

      <SectionHeader title="Carts" total={total} />
      <SearchFilterWrapper>
        <SearchFilter
          placeholder="Filter By Status"
          options={CART_STATUS}
          onChange={(val: string) => setSearchStatus(val === "ALL" ? "" : val)}
        />
      </SearchFilterWrapper>
      <BaseTable
        data={data}
        columns={columns}
        progressPending={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        totalRows={total}
        onRowClicked={handleUpdate}
      />
    </div>
  );
}
