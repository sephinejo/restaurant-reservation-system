import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';

export default function DashboardReservations() {
  const [error, setError] = useState(null);

  return (
    <div>
      <ErrorAlert error={error} />
    </div>
  );
}
