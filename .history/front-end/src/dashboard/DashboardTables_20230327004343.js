import React from 'react';

export default function DashboardTables({ tables }) {
  const tablesTable = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td></td>
      </tr>
    );
  });

  return <div></div>;
}
