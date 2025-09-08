"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { Pencil, Trash2, MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { SearchInput } from "@/components/Inputs/SearchInput";
import { DeleteModal } from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { STORE_CATEGORY_VALUES_OBJ } from "@/utils/values";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ToggleSwitch from "@/components/ToggleSwitch";
import { SearchFilterWrapper } from "@/components/SearchFilterWrapper";
import InputField from "@/components/Inputs/InputField";

export default function InstagramPagesPage() {
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
          platform: "instagram",
        };
        const response = await serverRequest.get("/v1/channels", {
          params,
        });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.channels);
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
      const response = await serverRequest.delete(`/v1/channels/${id}`);
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

  const handleUpdate = async (row: any) => {
    try {
      const response = row.isSubscribed
        ? await serverRequest.delete(`/v1/channels/${row._id}/subscribe`)
        : await serverRequest.post(`/v1/channels/${row._id}/subscribe`);
      setReload(reload + 1);
      toast.success(response.data.message);
    } catch (error: any) {
      console.error(error);
      return toast.error(error?.response?.data?.message);
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

  const columns: TableColumn<any>[] = [
    {
      name: "Image",
      cell: (row: any) => (
        <img
          src={row.imageURL}
          alt={row.name}
          width={35}
          height={35}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Category",
      selector: (row: any) => row.category,
    },
    {
      name: "Receive Messages",
      cell: (row: any) => (
        <div>
          <ToggleSwitch
            checked={row.isSubscribed}
            onChange={(e) => handleUpdate(row)}
            //onChange={(e) => handleChange("isReturnable", e.target.checked)}
          />
        </div>
      ),
    },
    {
      name: "Connection Date",
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
        title={`Delete ${target?.name}`}
        isDeleting={isDeleting}
        isOpen={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={() => deleteData(target?._id)}
      />

      <SectionHeader
        title="Instagram Pages"
        addBtnText="Connect Pages"
        total={total}
        onAction={() => {
          window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FACEBOOK_CALLBACK}&scope=pages_messaging,pages_manage_metadata,pages_show_list,instagram_basic,instagram_manage_messages&state=${user?._id}`;
        }}
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
      />
    </div>
  );
}
