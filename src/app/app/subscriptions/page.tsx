"use client";
import { SectionHeader } from "@/components/SectionHeader";
import BaseTable from "@/components/Table";
import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { format } from "date-fns";
import { formatMoney, formatNumber } from "@/utils/numbers";
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
        const response = await serverRequest.get("/v1/subscriptions", {
          params,
        });
        setIsLoading(false);
        setTotal(response.data.total);
        setData(response.data.subscriptions);
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

  const getStatus = (status: string) => {
    if (status === "paid")
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
      selector: (row: any) => `#${row.subscriptionId}`,
    },
    {
      name: "Plan",
      selector: (row: any) => row?.plan?.name,
    },
    {
      name: "Status",
      cell: (row: any) => getStatus(row.status.toLowerCase()),
    },
    {
      name: "Amount",
      selector: (row: any) =>
        formatMoney(
          row?.payment?.amountCents / 100,
          "en",
          row?.payment?.currency
        ),
    },
    {
      name: "Tokens Limit",
      selector: (row: any) => formatNumber(row?.tokensLimit | 0),
    },
    {
      name: "Tokens Used",
      selector: (row: any) => formatNumber(row?.tokensUsed | 0),
    },
    {
      name: "Start Date",
      selector: (row: any) => format(new Date(row.startDate), "yyyy-MM-dd"),
    },
    {
      name: "End Date",
      selector: (row: any) => format(new Date(row.endDate), "yyyy-MM-dd"),
    },
    {
      name: "Date",
      selector: (row: any) =>
        format(new Date(row.createdAt), "yyyy-MM-dd hh:mm a"),
    },
  ];

  return (
    <div>
      <SectionHeader title="Subscriptions" total={total} />
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
