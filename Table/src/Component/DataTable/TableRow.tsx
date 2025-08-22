import TableCell from './TableCell';

interface TableRowProps<T> {
  row: T;
  columns: { key: string; dataIndex: keyof T; title: string }[];
  selectable: boolean;
  isSelected: boolean;
  onToggle: () => void;
}

const TableRow = <T,>({ row, columns, selectable, isSelected, onToggle }: TableRowProps<T>) => {
  return (
    <tr className="border-b last:border-b-0 hover:bg-gray-50">
      {selectable && (
        <td className="px-4 py-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={isSelected}
            onChange={onToggle}
          />
        </td>
      )}
      {columns.map(col => (
        <TableCell key={col.key}>
          {String(row[col.dataIndex])}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;


