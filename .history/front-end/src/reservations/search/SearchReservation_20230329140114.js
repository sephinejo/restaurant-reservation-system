import React from 'react';

export default function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState({ mobile_number: '' });
  const [foundReservations, setFoundReservation] = useState(null);
  const [error, setError] = useState(null);

  function changeHandler({ target: { value } }) {
    setPhoneNuumber({ value });
  }

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
