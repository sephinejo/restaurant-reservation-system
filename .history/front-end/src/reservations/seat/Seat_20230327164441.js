import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../../layout/ErrorAlert';

export default function Seat() {
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);

  function submitHandler() {}

  return (
    <div>
      <h1>{`Reservation ID {${reservation_id}} Assign to Table`}</h1>
      <form onSubmit={submitHandler}></form>
    </div>
  );
}
