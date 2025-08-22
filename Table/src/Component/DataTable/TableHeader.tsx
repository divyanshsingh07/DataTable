import React from 'react';
import type { Column, SortOrder } from './types';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface TableHeaderProps<T> {
  columns: Column<T>[];
  selectable: boolean;
  sortOrder: SortOrder;
  sortColumnKey: string | null;
  onSort: (column: Column<T>) => void;
  allSelected: boolean;
  onToggleAll: () => void;
}

const SortIcon: React.FC<{ order: SortOrder }> = ({ order }) => (
  <span className="ml-1 inline-flex flex-col leading-none" aria-hidden>
    <FiChevronUp className={order === 'asc' ? 'text-gray-900' : 'text-gray-300'} />
    <FiChevronDown className={order === 'desc' ? 'text-gray-900' : 'text-gray-300'} />
  </span>
);

const TableHeader = <T,>({
  columns,
  selectable,
  sortOrder,
  sortColumnKey,
  onSort,
  allSelected,
  onToggleAll,
}: TableHeaderProps<T>) => {
  return (
    <thead className="bg-gray-50">
      <tr className="border-b">
        {selectable && (
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={allSelected}
              onChange={onToggleAll}
            />
          </th>
        )}
        {columns.map(col => {
          const isSorted = sortColumnKey === col.key;
          const canSort = col.sortable;
          return (
            <th
              key={col.key}
              className="px-4 py-3 text-left text-sm font-semibold text-gray-700 select-none"
            >
              <button
                type="button"
                className={`inline-flex items-center ${canSort ? 'hover:text-gray-900' : 'cursor-default'}`}
                onClick={() => canSort && onSort(col)}
                disabled={!canSort}
              >
                {col.title}
                {canSort && <SortIcon order={isSorted ? (sortOrder ?? null) : null} />}
              </button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader as <T,>(props: TableHeaderProps<T>) => JSX.Element;


