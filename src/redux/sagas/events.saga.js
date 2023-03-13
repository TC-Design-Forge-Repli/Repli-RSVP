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
  } catch (error) {
    console.error('Event code check error', error);
  }
}

// GET
function* fetchEvent(action) {
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

function* eventsSaga() {
  yield takeLatest('SAGA/CREATE_EVENT', createEvent);
  yield takeLatest('SAGA/FETCH_EVENT', fetchEvent);
}


export default eventsSaga;