import React from 'react';
import { useLocation } from 'react-router-dom';

export default function DashboardReservations({ reservations }) {
  if (location.)
  const reservationsTable = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
      </tr>
    );
  });

  return (
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
        <tbody>{reservationsTable}</tbody>
      </table>
    </div>
  );
}
