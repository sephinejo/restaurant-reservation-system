import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import DashboardButtons from './DashboardButtons';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservationsDate, setReservationsDate] = useState(date);

  const query = useQuery();
  const queryDate = query.get('date');

  useEffect(() => {
    if (queryDate) {
      setReservationsDate(queryDate);
    }
  }, [queryDate]);
  console.log(reservationsDate);

  useEffect(loadReservations, [reservationsDate]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservationsDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for date: {date}</h4>
        <DashboardButtons reservationsDate={reservationsDate} />
      </div>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
