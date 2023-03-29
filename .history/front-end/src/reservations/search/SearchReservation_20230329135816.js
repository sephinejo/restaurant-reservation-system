import React from 'react';

export default function SearchReservation() {
  return (
    <div>
      <h1>Find Reservation</h1>
      <form onSubmit={submitHandler}>
        <div><input id='mobile_number' name='mobile_number' type="text" onChange={changeHandler} value={} /></div>
      </form>
    </div>
  );
}
