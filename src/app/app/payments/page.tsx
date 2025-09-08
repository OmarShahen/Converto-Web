"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { formatMoney } from "@/utils/numbers";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function PaymentsPage() {
  const user = useSelector((state: RootState) => state.user.user);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          page,
          limit,
          userId: user?._id,
        };
        const response = await serverRequest.get("/v1/payments", { params });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.payments);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [page, limit, reload]);

  const handlePageChange = (page: any) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: any, page: any) => {
    setLimit(newRowsPerPage);
  };

  const getPaymentStatus = (status: string) => {
    if (status === "success")
      return (
        <div className="bg-green-100 text-green-500 font-semibold py-1 px-2 rounded-sm">
          {status}
        </div>
      );

    if (status === "refunded")
      return (
        <div className="bg-yellow-100 text-yellow-500 font-semibold py-1 px-2 rounded-sm">
          {status}
        </div>
      );

    return (
      <div className="bg-gray-100 text-[#000] font-semibold py-1 px-2 rounded-sm">
        {status}
      </div>
    );
  };

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row: any) => `#${row.paymentId}`,
    },
    {
      name: "Status",
      cell: (row: any) => getPaymentStatus(row.status.toLowerCase()),
    },
    {
      name: "Amount",
      selector: (row: any) =>
        formatMoney(row.amountCents / 100, "en", row.currency),
    },
    {
      name: "Refund Date",
      selector: (row: any) =>
        row.refundDate
          ? format(new Date(row.refundDate), "yyyy-MM-dd hh:mm a")
          : "Not registered",
    },
    {
      name: "Date",
      selector: (row: any) =>
        format(new Date(row.createdAt), "yyyy-MM-dd hh:mm a"),
    },
  ];

  return (
    <div>
      <SectionHeader title="Payments" total={total} />
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
