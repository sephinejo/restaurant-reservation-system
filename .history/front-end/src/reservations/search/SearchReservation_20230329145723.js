import React, { useState } from 'react';
import { searchReservation } from '../../utils/api';
import ErrorAlert from '../../layout/ErrorAlert';
import DashboardReservations from '../../dashboard/DashboardReservations';

export default function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foundReservations, setFoundReservations] = useState(null);
  const [error, setError] = useState(null);

  function changeHandler({ target: { value } }) {
    setPhoneNumber(value);
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    searchReservations(phoneNumber, abortController.signal)
      .then(setFoundReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  console.log(phoneNumber);
  console.log(foundReservations);

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
          <DashboardReservations reservations={foundReservations} />
        </div>
      ) : null}
    </div>
  );
}
