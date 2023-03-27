import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservationDate, setReservationDate] = useState(date);

  const query = useQuery();
  const queryDate = query.get('date');

  useEffect(() => {
    if (queryDate) {
      setReservationDate(queryDate);
    }
  }, [reservationDate]);
  console.log(queryDate);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
