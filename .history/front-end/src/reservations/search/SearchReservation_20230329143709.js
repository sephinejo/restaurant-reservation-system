import React, { useState } from 'react';
import { listReservations, updateReservationStatus } from '../../utils/api';
import ErrorAlert from '../../layout/ErrorAlert';
import DashboardReservations from '../../dashboard/DashboardReservations';

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
    listReservations(phoneNumber, abortController.signal)
      .then(setFoundReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  async function cancelReservationHandler(e, reservation_id) {
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
      return () => abortController.abort();
    }
  }

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
            placeholder='XXX-XXX-XXXX'
            onChange={changeHandler}
            value={phoneNumber}
          />
        </div>
        <div>
          <button type='submit'>Find</button>
        </div>
      </form>
      {foundReservations ? (
        <div>
          <h2>Matched Reservations:</h2>
          <DashboardReservations
            reservations={foundReservations}
            setFoundReservations={setFoundReservations}
          />
        </div>
      ) : null}
    </div>
  );
}
