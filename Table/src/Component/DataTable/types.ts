export type SortOrder = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export interface SortState<T> {
  columnKey: string | null;
  dataIndex: keyof T | null;
  order: SortOrder;
}
