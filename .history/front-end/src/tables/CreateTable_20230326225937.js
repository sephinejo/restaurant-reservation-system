import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import TableForm from './TableForm';

export default function CreateTable() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [table, setTable] = useState({ table_name: '', capacity: '' });

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Create Table</h1>
      <ErrorAlert error={error} />
      <div>
        <form onSubmit={submitHandler}>
          <TableForm table={table} />
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
