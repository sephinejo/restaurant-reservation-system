import React from 'react';
import { searchReservations } from '../../utils/api';

export default function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState({ mobile_number: '' });
  const [foundReservations, setFoundReservations] = useState(null);
  const [error, setError] = useState(null);

  function changeHandler({ target: { value } }) {
    setPhoneNumber({ value });
  }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    setFoundReservations([]);
    searchReservations(phoneNumber, abortController.signal).then((res) => {
      if (res.length) {
        return setFoundReservations(res);
      } else {
        setError({ message: 'No reservations found.' });
      }
    });
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
