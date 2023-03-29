import React, { useState } from 'react';
import { searchReservations } from '../../utils/api';
import ErrorAlert from '../../layout/ErrorAlert';

export default function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState({ mobile_number: '' });
  const [foundReservations, setFoundReservations] = useState(null);
  const [error, setError] = useState(null);

  function changeHandler({ target: { value } }) {
    setPhoneNumber({ value });
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    setFoundReservations([]);
    searchReservations(phoneNumber, abortController.signal)
      .then((res) => {
        if (res.length) {
          return setFoundReservations(res);
        } else {
          setError({ message: 'No reservations found.' });
        }
      })
      .catch(setError);
    return () => abortController.abort();
  }

  const foundReservationsTable = foundReservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td></td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Find Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <div>
          <input
            id='mobile_number'
            name='mobile_number'
            type='text'
            onChange={changeHandler}
            value={phoneNumber}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <h4>Reservations for {phoneNumber}</h4>
      {foundReservations ? (
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
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{foundReservationsTable}</tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
