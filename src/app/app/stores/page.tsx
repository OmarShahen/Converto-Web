"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { Pencil, Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { DeleteModal } from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { STORE_CATEGORY_VALUES_OBJ } from "@/utils/values";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SearchFilterWrapper } from "@/components/SearchFilterWrapper";
import InputField from "@/components/Inputs/InputField";

export default function StoresPage() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

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
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/stores", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.stores);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [searchName, page, limit, reload]);

  const deleteData = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serverRequest.delete(`/v1/stores/${id}`);
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
    router.push(`/app/stores/form/store-info?storeId=${row._id}&mode=UPDATE`);
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

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row: any) => `#${row.storeId}`,
    },
    {
      name: "Store",
      selector: (row: any) => row.name,
    },
    {
      name: "Category",
      selector: (row: any) => STORE_CATEGORY_VALUES_OBJ[row.category],
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

      <SectionHeader
        title="Stores"
        addBtnText="Create Store"
        total={total}
        onAction={() => router.push("/onboarding/store/basic-info")}
      />
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
