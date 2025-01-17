import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReservationForm from './ReservationForm';
import { createReservation } from '../../utils/api';
import ErrorAlert from '../../layout/ErrorAlert';

export default function CreateReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  });

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    createReservation(reservation, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <div>
        <form onSubmit={submitHandler}>
          <ReservationForm
            reservation={reservation}
            setReservation={setReservation}
          />
          <div>
            <button type='button' onClick={cancelHandler}>
              Cancel
            </button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
