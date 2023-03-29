import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateReservationStatus } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

export default function DashboardReservations({ reservations }) {
  const history = useHistory();

  let filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.status !== 'finished' && reservation.status !== 'cancelled'
    );
  });

  async function cancelReservationHandler(reservation_id) {
    if (
      window.confirm(
        'Do you want to cancel this reservation? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      await updateReservationStatus(
        reservation_id,
        'cancelled',
        abortController.signal
      );
      history.push('/');
      return () => abortController.abort();
    }
  }

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
          <div>
            <a href={`/reservations/${reservation.reservation_id}/edit`}>
              Edit
            </a>
          </div>
          <div>
            <button
              type='button'
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() =>
                cancelReservationHandler(reservation.reservation_id)
              }
            >
              Cancel
            </button>
          </div>
          {reservation.status === 'booked' ? (
            <div>
              <a href={`/reservations/${reservation.reservation_id}/seat`}>
                Seat
              </a>
            </div>
          ) : null}
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
