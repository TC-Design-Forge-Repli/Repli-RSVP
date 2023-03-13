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
function* fetchEvent() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/events'
    })

    yield put({
      type: 'SET_EVENT_DETAILS',
      payload: response.data
    })

  } catch (error) {
    console.error('Error fetchEvent saga:', error);
  }
}

// PUT
function* updateEventCode(action) {
  const newEventCode = action.payload;
  console.log('newEventCode:', newEventCode);
  
  try {
    const response = yield axios({
      method: 'PUT',
      url: '/api/events',
      data: {newEventCode}
    })

    yield put({
      type: 'SAGA/FETCH_EVENT'
    })
  } catch (error) {
    console.error('Error updateEventCode saga:', error);
  }
}

function* eventsSaga() {
  yield takeLatest('SAGA/CREATE_EVENT', createEvent);
  yield takeLatest('SAGA/FETCH_EVENT', fetchEvent);
  yield takeLatest('SAGA/UPDATE_EVENT_CODE', updateEventCode);
}


export default eventsSaga;