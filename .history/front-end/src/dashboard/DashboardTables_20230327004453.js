import React from 'react';

export default function DashboardTables({ tables }) {
  const tablesTable = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
