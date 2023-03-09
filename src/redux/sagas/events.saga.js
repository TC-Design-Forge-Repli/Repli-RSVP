import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


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

function* eventsSaga() {
  yield takeLatest('SAGA/CREATE_EVENT', createEvent);
  yield takeLatest('SAGA/FETCH_EVENT', fetchEvent);
}


export default eventsSaga;