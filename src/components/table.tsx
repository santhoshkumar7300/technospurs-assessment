import {
  TableHeaderProps,
  TablePaginationProps,
  TableProps,
} from "@/@types/components";
import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react";
import { Plus, RefreshCcw, Upload, Download, Filter } from "lucide-react";
import NoDataIcon from "@/assets/svg/nodata.svg";
import StyledText from "./styledText";
import Select from "./select";
import { Fragment, useEffect, useState } from "react";

const Table = <T extends Record<string, any>>({
  columns,
  data = [],
  rowKey,
  onRowClick,
  striped = true,
  responsive = true,
  className = "",
  pagination = false,
  isLoading = false,
  headerActions,
  isHeaderEnable = true,
  isShowSerialNo = true,
  isSearchEnable = false,
  searchText = "",
  setSearchText,
  isFilterEnable = false,
  onPressFilter,
  isLocalPaginate = false,
  isExpandableRow = false,
  renderExpandContent,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = pagination ? pagination.pageSize : 10;
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isLocalPaginate && pagination && pagination.current) {
      setCurrentPage(pagination.current);
    }
  }, [pagination, isLocalPaginate]);

  const containerClass = [
    "w-full",
    "rounded-lg",
    "border border-gray-200",
    className,
  ].join(" ");

  const wrapperClass = [
    responsive ? "overflow-x-auto w-full" : "",
    "relative shadow-md sm:rounded-lg",
  ].join(" ");

  const getColSpanCount = () => {
    let colSpan = columns.length;
    if (headerActions?.actions && headerActions?.actions?.length > 0) {
      colSpan += 1;
    }
    return colSpan + 1;
  };

  const getList = () => {
    if (isLocalPaginate) {
      return [...data].slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    }

    return [...data];
  };

  return (
    <div className="space-y-2">
      {isHeaderEnable && (
        <div className="mb-2">
          <TableHeader {...headerActions} />
        </div>
      )}
      {(isSearchEnable || isFilterEnable) && (
        <div className="flex items-center justify-between mb-4 space-x-4">
          {isSearchEnable ? (
            <div className="relative w-full max-w-xs flex items-center border border-[var(--light-primary-color)] rounded-lg">
              <div className="flex items-center pl-3">
                <Search className="w-5 h-5 text-[var(--primary-color)]" />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  if (setSearchText) {
                    setSearchText(e.target.value);
                  }
                }}
                maxLength={60}
                className="w-full outline-none px-4 py-2 text-sm text-gray-700 focus:outline-none rounded-r-lg transition-all duration-300 ease-in-out"
                placeholder="Search here..."
              />
            </div>
          ) : (
            <div></div>
          )}

          {isFilterEnable && (
            <button
              onClick={onPressFilter}
              className=" py-2 h-10 w-10 cursor-pointer flex justify-center items-center text-[--primary-color] bg-[var(--light-primary-color)] rounded-lg hover:bg-dark-primary-color transition-all duration-300"
            >
              <FilterIcon color="var(--primary-color)" className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
      <div className={containerClass}>
        <div className={wrapperClass}>
          <table className="min-w-full w-full text-sm text-left text-gray-700">
            <thead className="text-sm text-[--black-color] font-bold bg-[var(--light-primary-color)]">
              <tr>
                {isShowSerialNo && (
                  <th className="px-6 py-4 text-center w-12">S.No</th>
                )}
                {columns.map((col, ind) => (
                  <th
                    key={`${col.key}-${ind}`}
                    className={`px-6 py-4 ${col.className || ""}`}
                    style={{
                      width: col.width || "auto",
                      textAlign: col.align || "left",
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`} className="animate-pulse">
                    <td colSpan={getColSpanCount()}>
                      <div className="h-4 bg-gray-200 rounded w-full my-2 p-3" />
                    </td>
                  </tr>
                ))
              ) : [...getList()].length > 0 ? (
                [...getList()].map((record, index) => {
                  const rowId = rowKey ? `${record[rowKey]}-${index}` : index;
                  const rowClass = striped
                    ? index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                    : "";
                  const serialNo = pagination
                    ? (pagination.current - 1) * pagination.pageSize + index + 1
                    : index + 1;
                  const isExpanded = expandedRows.has(index);
                  return (
                    <Fragment key={rowId}>
                      <tr
                        className={`border-b border-gray-200 transition-colors duration-200 ease-in-out ${rowClass} ${
                          onRowClick
                            ? "cursor-pointer hover:bg-blue-50"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          if (isExpandableRow) {
                            setExpandedRows((prev) => {
                              const newSet = new Set(prev);
                              if (newSet.has(index)) {
                                newSet.delete(index);
                              } else {
                                newSet.add(index);
                              }
                              return newSet;
                            });
                          }
                          onRowClick?.(record, index);
                        }}
                      >
                        {isShowSerialNo && (
                          <td className="px-6 py-4 text-center font-medium text-gray-700">
                            {serialNo}
                          </td>
                        )}
                        {columns.map((col, ind) => (
                          <td
                            key={`${col.key}-${ind + 1}`}
                            className="px-6 py-4"
                            style={{
                              width: col.width || "auto",
                              textAlign: col.align || "left",
                            }}
                          >
                            {col.render
                              ? col.dataIndex
                                ? col.render(
                                    record[col.dataIndex],
                                    record,
                                    index
                                  )
                                : col.render(record, index, index)
                              : col.dataIndex
                              ? record[col.dataIndex]
                              : null}
                          </td>
                        ))}
                      </tr>
                      {isExpandableRow && (
                        <tr>
                          <td colSpan={getColSpanCount()}>
                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isExpanded ? "max-h-[500px] p-2" : "max-h-0"
                              }`}
                            >
                              {isExpanded &&
                                renderExpandContent?.(record, index)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={getColSpanCount()}>
                    <div className="flex flex-col justify-center items-center h-[200px] text-gray-500">
                      <img src={NoDataIcon} alt="no-data" />
                      <div>No Data</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          onChange={pagination.onChange}
        />
      )}
    </div>
  );
};

export default Table;

const Pagination: React.FC<TablePaginationProps> = ({
  current,
  total,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          current - 1,
          current,
          current + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);

  return (
    <div className="flex justify-end items-center py-4 gap-4 text-sm text-gray-700">
      <div className="text-sm text-gray-600">
        {`${start ?? 0}-${end ?? 0} of ${total ?? 0} results`}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(current - 1, pageSize)}
          disabled={current === 1}
          className="p-1.5 rounded cursor-pointer hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {generatePages().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onChange(page, pageSize)}
              className={`min-w-[32px] cursor-pointer h-8 px-3 py-1.5 rounded text-sm transition-all
                ${
                  page === current
                    ? "border bg-[var(--primary-color)] text-[var(--white-color)] font-semibold"
                    : "hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onChange(current + 1, pageSize)}
          disabled={current === totalPages}
          className="p-1.5 rounded cursor-pointer hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          className="!w-36 flex justify-center"
          options={[...pageSizeOptions].map((size) => ({
            label: `${size} / Page`,
            value: size,
          }))}
          menuPlacement="top"
          value={{ label: `${pageSize} / Page`, value: pageSize }}
          onChange={(e: any) => {
            if (onChange) {
              onChange(1, Number(e.value));
            }
          }}
        />
      </div>
    </div>
  );
};

const TableHeader = ({
  title = "Table Title",
  subtitle = "Subtitle here",
  actions = [],
  onActionPress,
  customAction,
  isAnimatedLabel = true,
}: TableHeaderProps) => {
  const iconMap = {
    Add: Plus,
    Refresh: RefreshCcw,
    Upload: Upload,
    Download: Download,
    Filter: Filter,
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[var(--primary-color)] bg-opacity-70 backdrop-blur-md p-4 rounded-xl shadow-md text-white">
      <div>
        <StyledText
          as="h2"
          className="text-lg sm:text-xl font-semibold text-[var(--table-header-title-color)] mb-2"
        >
          {title}
        </StyledText>
        <StyledText
          as="p"
          className="text-sm text-[var(--table-header-subtitle-color)]"
        >
          {subtitle}
        </StyledText>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center gap-2 flex-wrap">
        {customAction ? (
          customAction
        ) : (
          <>
            {actions.map((action) => {
              const Icon = iconMap[action.icon];
              if (!Icon) return null;

              const hasLabel = !!action.label;

              return (
                <button
                  key={action.id}
                  onClick={() => !action.isDisabled && onActionPress?.(action)}
                  disabled={action.isDisabled}
                  title={action.label || action.icon}
                  className={`group cursor-pointer relative h-12 min-w-12 ${
                    hasLabel && isAnimatedLabel
                      ? "group-hover:!min-w-[160px]"
                      : hasLabel
                      ? "min-w-[160px]"
                      : ""
                  } flex items-center justify-center ${
                    hasLabel && isAnimatedLabel
                      ? "group-hover:justify-start"
                      : hasLabel
                      ? "justify-start"
                      : ""
                  } px-0 ${
                    hasLabel && isAnimatedLabel
                      ? "group-hover:px-4"
                      : hasLabel
                      ? "px-4"
                      : ""
                  } rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 ease-in-out overflow-hidden disabled:opacity-50`}
                >
                  <Icon
                    strokeWidth={3}
                    className={`w-5 h-5 text-[var(--primary-color)] ${
                      hasLabel && isAnimatedLabel && "group-hover:ml-2"
                    } shrink-0`}
                  />
                  {hasLabel && (
                    <StyledText
                      as="span"
                      className={`whitespace-nowrap text-sm font-bold text-[var(--primary-color)] ${
                        isAnimatedLabel
                          ? "max-w-0 opacity-0 group-hover:max-w-md group-hover:opacity-100 group-hover:mx-2.5"
                          : "opacity-100 mx-2.5"
                      } transition-all duration-300 ease-in-out inline-block`}
                    >
                      {action.label}
                    </StyledText>
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
