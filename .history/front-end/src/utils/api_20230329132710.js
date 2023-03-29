/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from './format-reservation-date';
import formatReservationTime from './format-reservation-date';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append('Content-Type', 'application/json');

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const res = await fetch(url, options);

    if (res.status === 204) {
      return null;
    }

    const payload = await res.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

// Create New Reservation:
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations?date=${reservation.reservation_date}`;
  if (reservation.people.length) {
    const peopleNum = Number(reservation.people);
    reservation.people = peopleNum;
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Read Reservation
export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  return await fetchJson(url, { headers, signal }, {})
    .then(formatReservationDate)
    .then(formatReservationTime);
}

// Upate Reservation:
export async function updateReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
  if (reservation.people.length) {
    const peopleNum = Number(reservation.people);
    reservation.people = peopleNum;
  }
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Update Reservation with Status:
export async function setReservationStatus(reservation_id, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { status } }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Create New Table
export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  if (table.capacity.length) {
    const capacityNum = Number(table.capacity);
    table.capacity = capacityNum;
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// List Tables
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { method: 'GET', headers, signal }, []);
}

// Update Reservation with Status:
export async function updateReservationStatus(reservation_id, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { status } }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Update Table with Seating Reservation
export async function seatReservation(tableAssignment, signal) {
  const url = `${API_BASE_URL}/tables/${tableAssignment.table_id}/seat`;
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      data: { reservation_id: tableAssignment.reservation_id },
    }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Finish Seat
export async function finishSeat(tableId) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  return await fetchJson(url, { method: 'DELETE', headers }, {});
}
