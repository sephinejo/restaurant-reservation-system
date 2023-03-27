import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';

export default function DashboardReservations() {
  const [error, setError] = useState(null);

  return (
    <div>
      <ErrorAlert error={error} />
      <div>
        <table>
          <thead>
            <tr key={reservation.reservation_id}>
              <th>Reservation ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Party Size</th>
              <th>Reservation Status</th>
              <th>Reservation Options</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
