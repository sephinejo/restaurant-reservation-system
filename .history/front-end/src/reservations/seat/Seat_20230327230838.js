import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ErrorAlert from '../../layout/ErrorAlert';
import { seatReservation, listTables } from '../../utils/api';

export default function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableAssignment, setTableAssignment] = useState({
    table_id: '',
    reservation_id,
  });

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const tableAssignmentOptions = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>;
  ));

  function changeHandler({ target: { name, value } }) {
    setTableAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);

    if (!tableAssignment.table_id) {
      setError({
        message: 'Please select a table option from the drop down menu.',
      });
    } else {
      seatReservation(tableAssignment, abortController.signal)
        .then(() => history.push('/'))
        .catch(setError);
      return () => abortController.abort();
    }
  }

  return (
    <div>
      <h1>{`Reservation ID: {${reservation_id}}`}</h1>
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
          >
            <option value=''>Table Name - Table Capacity</option>
            {tableAssignmentOptions}
          </select>
        </div>
        <div>
          <button type='button' onClick={cancelHandler}>
            Cancel
          </button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}
