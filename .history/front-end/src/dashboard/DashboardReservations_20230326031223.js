import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';

export default function DashboardReservations({ reservations }) {
  const [error, setError] = useState(null);

  return (
    <div>
      <ErrorAlert error={error} />
      <div>
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Party Size</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
