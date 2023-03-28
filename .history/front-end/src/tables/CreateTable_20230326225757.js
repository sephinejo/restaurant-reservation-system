import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';

export default function CreateTable() {
  const [table, setTable] = useState({ table_name: '', capacity: '' });
  const [error, setError] = useState(null);

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Create Table</h1>
      <ErrorAlert error={error} />
      <div>
        <form onSubmit={submitHandler}>
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
