import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../../layout/ErrorAlert';

export default function Seat() {
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const [tableAssignment, setTableAssignment] = useState({
    table_id: '',
    reservation_id,
  });

  function changeHandler() {}

  function submitHandler() {}

  return (
    <div>
      <h1>{`Reservation ID {${reservation_id}}`}</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='table_assignment'>Assign to Table:</label>
          <select
            id='table_assignment'
            name='table_id'
            required
            value={tableAssignment.table_id}
            onChange={changeHandler}
          ></select>
        </div>
      </form>
    </div>
  );
}
