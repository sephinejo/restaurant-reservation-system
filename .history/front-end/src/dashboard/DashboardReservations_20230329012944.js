import React from 'react';

export default function DashboardReservations({ reservations }) {
  let filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.status !== 'finished' && reservation.status !== 'cancelled'
    );
  });

  const reservationsTable = filteredReservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
        </td>
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
            <th>Reservation Status</th>
            <th>Reservation Options</th>
          </tr>
        </thead>
        <tbody>{reservationsTable}</tbody>
      </table>
    </div>
  );
}
