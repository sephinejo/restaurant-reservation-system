import React from 'react';
import { finishSeat } from '../utils/api';

export default function DashboardTables({
  tables,
  loadTables,
  loadReservations,
}) {
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
        <td data-table-id-status={table.table_id}>
          {tableStatus} {occupant}
        </td>
        <td>
          {tableStatus === 'Occupied' ? (
            <FinishButton tableStatus={tableStatus} tableId={table.table_id} />
          ) : null}
        </td>
      </tr>
    );
  });

  function FinishButton({ tableId }) {
    return (
      <button
        type='button'
        data-table-id-finish={tableId}
        onClick={() => finishBtnHandler(tableId)}
      >
        Finish
      </button>
    );
  }

  async function finishBtnHandler(tableId) {
    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      await finishSeat(tableId);
      loadTables();
      loadReservations();
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Table ID</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>{tablesTable}</tbody>
      </table>
    </div>
  );
}
