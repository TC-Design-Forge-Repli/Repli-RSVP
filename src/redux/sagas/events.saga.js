import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// POST
function* createEvent(action) {
  try {
    const response = yield axios({
        method: 'POST',
        url: '/api/events',
        data: action.payload
    })
    yield put({
      type: 'SAGA/FETCH_EVENT'
    })
  } catch (error) {
    console.error('Event code check error', error);
  }
}

// GET
function* fetchEvent(action) {
  // console.log('action.payload:', action.payload);

  try {
    const response = yield axios({
      method: 'GET',
      url: `/api/events/${action.payload}`
    })

    yield put({
      type: 'EVENT_PRESSED',
      payload: response.data
    })

  } catch (error) {
    console.error('Error fetchEvent saga:', error);
  }
}

// PUT event name
function* updateEventName(action) {
  console.log('action.payload:', action.payload);

  const event_id = action.payload.id;
  const newEventName = action.payload.event_name;

  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/events/event_name/${event_id}`,
      data: {
        event_id,
        newEventName
      }
    })

    yield put({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
  } catch (error) {
    console.error('Error updateEventName saga:', error);
  }
}

// PUT event code
function* updateEventCode(action) {
  // console.log('action.payload:', action.payload);

  const event_id = action.payload.id;
  const newEventCode = action.payload.event_code;
  
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/events/event_code/${event_id}`,
      data: {
        event_id,
        newEventCode
      }
    })

    yield put({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
  } catch (error) {
    console.error('Error updateEventCode saga:', error);
  }
}

// PUT event date
function* updateEventDate(action) {
  // console.log('action.payload:', action.payload);

  const event_id = action.payload.id;
  const newEventDate = action.payload.event_date;
  
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/events/event_date/${event_id}`,
      data: {
        event_id,
        newEventDate
      }
    })

    yield put({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
  } catch (error) {
    console.error('Error updateEventDate saga:', error);
  }
}

// PUT event location
function* updateEventLocation(action) {
  // console.log('action.payload:', action.payload);

  const event_id = action.payload.id;
  const newEventLocation = action.payload.event_location;
  
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/events/event_location/${event_id}`,
      data: {
        event_id,
        newEventLocation
      }
    })

    yield put({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
  } catch (error) {
    console.error('Error updateEventLocation saga:', error);
  }
}

// PUT event deadline
function* updateEventDeadline(action) {
  // console.log('action.payload:', action.payload);

  const event_id = action.payload.id;
  const newEventDeadline = action.payload.event_deadline;
  
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/events/event_deadline/${event_id}`,
      data: {
        event_id,
        newEventDeadline
      }
    })

    yield put({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
  } catch (error) {
    console.error('Error updateEventDeadline saga:', error);
  }
}

function* eventsSaga() {
  yield takeLatest('SAGA/CREATE_EVENT', createEvent);
  yield takeLatest('SAGA/FETCH_EVENT', fetchEvent);
  yield takeLatest('SAGA/UPDATE_EVENT_NAME', updateEventName);
  yield takeLatest('SAGA/UPDATE_EVENT_CODE', updateEventCode);
  yield takeLatest('SAGA/UPDATE_EVENT_DATE', updateEventDate);
  yield takeLatest('SAGA/UPDATE_EVENT_LOCATION', updateEventLocation);
  yield takeLatest('SAGA/UPDATE_EVENT_DEADLINE', updateEventDeadline);
}


export default eventsSaga;