import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../../layout/ErrorAlert';

export default function Seat() {
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);

  function submitHandler() {}

  return (
    <div>
      <h1>{`Reservation ID {${reservation_id}}`}</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='table_assignment'>Assign to Table:</label>
          <select name='table_id' id=''></select>
        </div>
      </form>
    </div>
  );
}
