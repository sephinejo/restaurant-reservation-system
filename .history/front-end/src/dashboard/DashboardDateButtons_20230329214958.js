import React from 'react';
import { useHistory } from 'react-router-dom';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  const history = useHistory();

  function btnHandler(reservationsDate) {
    history.push(`/dashboard?date=${reservationsDate}`);
  }

  return (
    <div>
      <button
        className='btn btn-info'
        type='button'
        onClick={() => btnHandler(previous(reservationsDate))}
      >
        Previous
      </button>
      <button
        className='btn btn-info'
        type='button'
        onClick={() => btnHandler(today())}
      >
        Today
      </button>
      <button
        className='btn btn-info'
        type='button'
        onClick={() => btnHandler(next(reservationsDate))}
      >
        Next
      </button>
    </div>
  );
}
