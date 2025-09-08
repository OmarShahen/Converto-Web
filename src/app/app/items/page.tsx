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

export default function ItemsPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [categories, setCategories] = useState([]);

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
          categoryId: searchCategory,
          storeId: user?.storeId,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/items", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.items);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [searchName, searchCategory, user?.storeId, page, limit, reload]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!user?.storeId) {
          return;
        }
        const response = await serverRequest.get("/v1/categories", {
          params: { limit: 100, storeId: user.storeId, userId: user?._id },
        });
        const categories = response.data.categories;
        let categoriesOptions = categories.map((category: any) => {
          return { label: category.name, value: category._id };
        });
        categoriesOptions = [
          { label: "All", value: "ALL" },
          ...categoriesOptions,
        ];
        setCategories(categoriesOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [user?.storeId]);

  const deleteData = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serverRequest.delete(`/v1/items/${id}`);
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
      name: "Image",
      cell: (row: any) => (
        <div className="py-2">
          {row.images && row.images.length > 0 ? (
            <img
              src={row.images[0].url}
              alt={row.name}
              className="w-12 h-12 object-cover rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>
      ),
      width: "80px",
    },
    {
      name: "ID",
      selector: (row: any) => `#${row.itemId}`,
    },
    {
      name: "Item",
      selector: (row: any) => row.name,
      grow: 2,
    },
    {
      name: "Category",
      selector: (row: any) => row?.category?.name,
    },
    {
      name: "Price",
      selector: (row: any) =>
        formatMoney(row.price, "en", row?.store?.currency),
    },
    {
      name: "Stock",
      selector: (row: any) => formatNumber(row.stock),
    },
    {
      name: "Store",
      selector: (row: any) => row?.store?.name,
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
        title="Items"
        addBtnText="Create Item"
        total={total}
        onAction={handleCreateItem}
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
        <SearchFilter
          placeholder="Filter By Category"
          options={categories}
          onChange={(val: string) =>
            setSearchCategory(val === "ALL" ? "" : val)
          }
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
