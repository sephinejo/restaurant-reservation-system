import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ErrorAlert from '../../layout/ErrorAlert';
import { readReservations, updateReservation } from '../../utils/api';
import ReservationForm from '../new/ReservationForm';

export default function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  });

  function loadReservation() {
    const abortController = new AbortController();
    setError(null);
    readReservations(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }

  useEffect(loadReservation, [reservation_id]);

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    updateReservation(reservation, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Edit Reservation ID: {reservation_id}</h1>
      <ErrorAlert error={error} />
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
  );
}
