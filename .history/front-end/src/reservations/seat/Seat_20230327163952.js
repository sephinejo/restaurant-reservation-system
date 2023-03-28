import React from 'react';

export default function Seat() {
  function submitHandler() {}

  return (
    <div>
      <h1>{`Reservation ID {${reservation_id}} Assign to Table`}</h1>
      <form onSubmit={submitHandler}></form>
    </div>
  );
}
