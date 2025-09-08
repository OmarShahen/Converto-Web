"use client";

import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import CircularLoading from "./Loader";
import EmptySection from "./EmptySection";
import { Wrapper } from "./wrappers/wrapper";

type BaseTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onRowClicked?: (row: T) => void;
  pagination?: boolean;
  highlightOnHover?: boolean;
  selectableRows?: boolean;
  responsive?: boolean;
  striped?: boolean;
  progressPending?: boolean;
  isShowEmptyForm?: boolean;
  handlePageChange?: (page: number) => void;
  handleRowsPerPageChange?: (rowsPerPage: number, currentPage: number) => void;
  totalRows?: number;
  isExpandableRows?: boolean;
  ExpandedComponent?: React.ComponentType<{ data: T }>;
};

function BaseTable<T>({
  columns,
  data,
  onRowClicked,
  pagination = true,
  highlightOnHover = true,
  selectableRows = false,
  responsive = true,
  striped = false,
  progressPending = false,
  isShowEmptyForm = false,
  handlePageChange,
  handleRowsPerPageChange,
  totalRows = 0,
  isExpandableRows = false,
  ExpandedComponent,
}: BaseTableProps<T>) {
  return (
    <div className="shadow rounded-sm bg-white">
      <DataTable
        columns={columns}
        data={data}
        onRowClicked={onRowClicked}
        pagination={pagination}
        highlightOnHover={highlightOnHover}
        selectableRows={selectableRows}
        responsive={responsive}
        striped={striped}
        progressPending={progressPending}
        progressComponent={<CircularLoading />}
        noDataComponent={<EmptySection />}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        expandableRows={isExpandableRows}
        expandOnRowClicked={isExpandableRows}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}

export default BaseTable;
