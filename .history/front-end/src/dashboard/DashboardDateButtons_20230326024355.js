import React from 'react';
import { useHistory } from 'react-router-dom';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  const history = useHistory();

  function previousBtnHandler() {}
  function todayBtnHandler() {}
  function nextBtnHandler() {}

  return (
    <div>
      <button type='button' onClick={previousBtnHandler}>
        Previous
      </button>
      <button type='button' onClick={todayBtnHandler}>
        Today
      </button>
      <button type='button' onClick={nextBtnHandler}>
        Next
      </button>
    </div>
  );
}
