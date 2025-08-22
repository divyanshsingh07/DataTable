import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <tbody>
      <tr>
        <td className="px-4 py-6 text-center text-gray-500" colSpan={100}>No data available</td>
      </tr>
    </tbody>
  );
};

export default EmptyState;


