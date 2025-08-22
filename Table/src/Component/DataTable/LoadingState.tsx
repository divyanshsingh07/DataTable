import React from 'react';

interface LoadingStateProps {
  columnCount: number;
  rowCount?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ columnCount, rowCount = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columnCount }).map((__, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div className="h-4 w-full rounded bg-gray-200" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingState;


