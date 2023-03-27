import React from 'react';

export default function ReservationForm({ onSubmit, onChange, reservation }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor='first_name'>First Name</label>
        <input
          id='first_name'
          name='first_name'
          type='text'
          required
          onChange={onChange}
          value={reservation.first_name}
        />
        <label htmlFor='last_name'>Last Name</label>
        <input
          id='last_name'
          name='last_name'
          type='text'
          required
          onChange={onChange}
          value={reservation.last_name}
        />
        <label htmlFor='mobile_number'>Mobile Number</label>
        <input
          id='mobile_number'
          name='mobile_number'
          type='text'
          required
          onChange={onChange}
          value={reservation.mobile_number}
        />
        <label htmlFor='reservation_date'>Reservation Date</label>
        <input
          id='reservation_date'
          name='reservation_date'
          type='date'
          placeholder='YYYY-MM-DD'
          pattern='\d{4}-\d{2}-\d{2}'
          required
          onChange={onChange}
          value={reservation.reservation_date}
        />
        <label htmlFor='reservation_time'>Reservation Time</label>
        <input
          id='reservation_time'
          name='reservation_time'
          type='time'
          placeholder='HH:MM'
          pattern='[0-9]{2}:[0-9]{2}'
          required
          onChange={onChange}
          value={reservation.reservation_time}
        />
        <label htmlFor='people'>Party Size</label>
        <input
          id='people'
          name='people'
          type='text'
          required
          onChange={onChange}
          value={reservation.people}
        />
      </form>
    </div>
  );
}
