import React from 'react';
import { useParams } from 'react-router-dom';

export default function Seat() {
  const reservation_id = function submitHandler() {};

  return (
    <div>
      <h1>{`Reservation ID {${reservation_id}} Assign to Table`}</h1>
      <form onSubmit={submitHandler}></form>
    </div>
  );
}
