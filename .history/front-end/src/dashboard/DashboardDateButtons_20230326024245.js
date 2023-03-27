import React from 'react';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  function previousBtnHandler() {}
  function todayBtnHandler() {}
  function nextBtnHandler() {}

  return (
    <div>
      <button type='button' onClick={previousBtnHandler}>
        Previous
      </button>
      <button type='button' onClick={previousBtnHandler}>
        Today
      </button>
      <button type='button onClick={previousBtnHandler}'>Next</button>
    </div>
  );
}
