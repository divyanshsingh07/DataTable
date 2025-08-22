import React, { useMemo, useState } from 'react';
import type { Column, DataTableProps, SortState } from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

const getNextOrder = (current: 'asc' | 'desc' | null) => {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
};

const sortData = <T,>(data: T[], sort: SortState<T> | null): T[] => {
  if (!sort || !sort.dataIndex || !sort.order) return data;
  const sorted = [...data].sort((a, b) => {
    const av = a[sort.dataIndex as keyof T];
    const bv = b[sort.dataIndex as keyof T];
    if (av === bv) return 0;
    if (av == null) return -1;
    if (bv == null) return 1;
    if (typeof av === 'number' && typeof bv === 'number') {
      return av - bv;
    }
    return String(av).localeCompare(String(bv));
  });
  return sort.order === 'asc' ? sorted : sorted.reverse();
};

const DataTable = <T,>({ data, columns, loading = false, selectable = false, onRowSelect }: DataTableProps<T>) => {
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<Set<number>>(new Set());
  const [sortState, setSortState] = useState<SortState<T> | null>(null);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    setSortState(prev => {
      const nextOrder = getNextOrder(prev && prev.columnKey === column.key ? prev.order : null);
      return nextOrder
        ? { columnKey: column.key, dataIndex: column.dataIndex, order: nextOrder }
        : null;
    });
  };

  const sortedData = useMemo(() => sortData<T>(data, sortState), [data, sortState]);

  const toggleRow = (index: number) => {
    const copy = new Set(selectedRowIndexes);
    if (copy.has(index)) copy.delete(index); else copy.add(index);
    setSelectedRowIndexes(copy);
  };

  const allSelected = selectable && sortedData.length > 0 && selectedRowIndexes.size === sortedData.length;
  const toggleAll = () => {
    if (!selectable) return;
    if (allSelected) setSelectedRowIndexes(new Set());
    else setSelectedRowIndexes(new Set(sortedData.map((_, idx) => idx)));
  };

  React.useEffect(() => {
    if (!onRowSelect) return;
    const selectedRows = Array.from(selectedRowIndexes).map(i => sortedData[i]).filter(Boolean);
    onRowSelect(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowIndexes, sortedData]);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse bg-white">
        <TableHeader
          columns={columns}
          selectable={selectable}
          sortOrder={sortState?.order ?? null}
          sortColumnKey={sortState?.columnKey ?? null}
          onSort={handleSort}
          allSelected={allSelected}
          onToggleAll={toggleAll}
        />

        {loading ? (
          <LoadingState columnCount={columns.length + (selectable ? 1 : 0)} />
        ) : sortedData.length === 0 ? (
          <EmptyState />
        ) : (
          <TableBody
            data={sortedData}
            columns={columns}
            selectable={selectable}
            selectedRowIndexes={selectedRowIndexes}
            onToggleRow={toggleRow}
          />
        )}
      </table>
    </div>
  );
};

export default DataTable as <T,>(props: DataTableProps<T>) => JSX.Element;


