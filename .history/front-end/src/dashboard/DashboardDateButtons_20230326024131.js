import React from 'react';
import { today, previous, next } from '../utils/date-time';

export default function DashboardDateButtons({ reservationsDate }) {
  return (
    <div>
      <button type='button'>Previous</button>
      <button type='button'>Today</button>
      <button type='button'>Next</button>
    </div>
  );
}
