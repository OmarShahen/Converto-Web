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
import { MessengerIcon } from "@/components/icons/messenger";
import { InstagramIcon } from "@/components/icons/instagram";
import { WebIcon } from "@/components/icons/web";

export default function CustomersPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const [target, setTarget] = useState({ _id: "", name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          name: searchName,
          page,
          limit,
          storeId: user?.storeId,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/customers", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.customers);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [searchName, user?.storeId, page, limit, reload]);

  const deleteData = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serverRequest.delete(`/v1/customers/${id}`);
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
      name: "ID",
      selector: (row: any) => `#${row.customerId}`,
    },
    {
      name: "Customer",
      selector: (row: any) => row.name,
      grow: 1,
    },
    {
      name: "Phone",
      selector: (row: any) => row?.phone || "Not registered",
    },
    {
      name: "Email",
      selector: (row: any) => row?.email || "Not registered",
      grow: 2,
    },
    {
      name: "Platform",
      selector: (row: any) => <div>{getPlatformIcon(row.source)}</div>,
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
            onClick={() => handleUpdate(row)}
            className="p-1 cursor-pointer"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
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

      <SectionHeader title="Customers" total={total} />
      <SearchFilterWrapper>
        <InputField
          id="search"
          name="search"
          type="search"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
          placeholder="Search by name"
          icon={<Search size={20} />}
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
