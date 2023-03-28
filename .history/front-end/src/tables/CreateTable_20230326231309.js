import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { createTable } from '../utils/api';

export default function CreateTable() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [table, setTable] = useState({ table_name: '', capacity: '' });

  function changeHandler({ target: { name, value } }) {
    setTable((prev) => ({ ...prev, [name]: value }));
  }

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    createTable(table, abortController.signal)
      .then(() => history.push('/'))
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Create Table</h1>
      <ErrorAlert error={error} />
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='table_name'>Table Name:</label>
            <input
              id='table_name'
              name='table_name'
              type='text'
              minlength='2'
              required
              onChange={changeHandler}
              value={table.table_name}
            />
          </div>
          <div>
            <label htmlFor='capacity'>Capacity:</label>
            <input
              id='capacity'
              name='capacity'
              type='text'
              required
              onChange={changeHandler}
              value={table.capacity}
            />
          </div>
          <div>
            <button type='button' onClick={cancelHandler}>
              Cancel
            </button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
