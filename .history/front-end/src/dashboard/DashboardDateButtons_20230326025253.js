import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  const history = useHistory();
  const location = useLocation();

  function previousBtnHandler() {
    history.push({
      pathname: location.path,
      search: `?date=${previous(reservationsDate)}`,
    });
  }

  function todayBtnHandler() {
    history.push({
      pathname: location.path,
      search: `?date=${today()}`,
    });
  }

  function nextBtnHandler() {
    history.push({
      pathname: location.path,
      search: `?date=${next(reservationsDate)}`,
    });
  }

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
