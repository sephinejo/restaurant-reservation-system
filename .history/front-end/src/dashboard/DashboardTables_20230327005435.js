import React from 'react';

export default function DashboardTables({ tables }) {
  const tablesTable = tables.map((table) => {
    let tableStatus = 'Free';
    if (table.reservation_id) {
      tableStatus = 'Occupied';
    }

    let occupant = null;
    if (tableStatus === 'Occupied') {
      occupant = `reserved by Reservation ID: ${table.reservation_id}`;
    }

    return (
      <tr key={table.table_id}>
        <td>{table.table_id}</td>
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
            <th>Table ID</th>
            <th>Table Name</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>{tablesTable}</tbody>
      </table>
    </div>
  );
}
