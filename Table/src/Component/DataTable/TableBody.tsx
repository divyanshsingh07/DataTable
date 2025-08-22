import React from 'react';
import type { Column } from './types';
import TableRow from './TableRow';

interface TableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable: boolean;
  selectedRowIndexes: Set<number>;
  onToggleRow: (rowIndex: number) => void;
}

const TableBody = <T,>({ data, columns, selectable, selectedRowIndexes, onToggleRow }: TableBodyProps<T>) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          columns={columns}
          selectable={selectable}
          isSelected={selectedRowIndexes.has(rowIndex)}
          onToggle={() => onToggleRow(rowIndex)}
        />
      ))}
    </tbody>
  );
};

export default TableBody as <T,>(props: TableBodyProps<T>) => JSX.Element;


