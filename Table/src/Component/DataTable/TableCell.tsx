import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return (
    <td className="px-4 py-3 align-middle text-sm text-gray-800">{children}</td>
  );
};

export default TableCell;


