import React from 'react';
import { today, previous, next } from '../utils/date-time';

export default function DashboardButtons() {
  return (
    <div>
      <button>Previous</button>
      <button>Today</button>
      <button>Next</button>
    </div>
  );
}
