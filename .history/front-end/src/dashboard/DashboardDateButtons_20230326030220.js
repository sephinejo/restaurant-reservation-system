import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  const history = useHistory();
  const location = useLocation();

  function btnHandler(reservationsDate) {
    history.push(`/dashboard?date=${reservationsDate}`);
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => btnHandler(previous(reservationsDate))}
      >
        Previous
      </button>
      <button type='button' onClick={() => btnHandler(today())}>
        Today
      </button>
      <button type='button' onClick={() => btnHandler(next(reservationsDate))}>
        Next
      </button>
    </div>
  );
}
