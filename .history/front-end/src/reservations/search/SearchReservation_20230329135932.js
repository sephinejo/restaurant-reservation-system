import React from 'react';

export default function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState({ mobile_number: '' });
  return (
    <div>
      <h1>Find Reservation</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            id='mobile_number'
            name='mobile_number'
            type='text'
            onChange={changeHandler}
            value={phoneNumber}
          />
        </div>
      </form>
    </div>
  );
}
