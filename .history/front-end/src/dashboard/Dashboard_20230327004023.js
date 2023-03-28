import React, { useEffect, useState } from 'react';
import { listReservations, listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import DashboardDateButtons from './DashboardDateButtons';
import DashboardReservations from './DashboardReservations';
import DashboardTables from './DashboardTables';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [reservationsDate, setReservationsDate] = useState(date);
  const [tables, setTables] = useState([]);

  const query = useQuery();
  const queryDate = query.get('date');

  useEffect(() => {
    if (queryDate) {
      setReservationsDate(queryDate);
    }
  }, [queryDate]);

  useEffect(loadReservations, [reservationsDate]);
  useEffect(loadTables, []);

  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date: reservationsDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={error} />
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for date: {reservationsDate}</h4>
        <DashboardDateButtons reservationsDate={reservationsDate} />
        <DashboardReservations reservations={reservations} />
      </div>
      <div>
        <DashboardTables tables={tables} />
      </div>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
