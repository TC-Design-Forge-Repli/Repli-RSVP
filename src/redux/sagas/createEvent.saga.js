import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createEvent(action) {
  try {
    const response = yield axios({
        method: 'POST',
        url: '/api/createEvent',
        data: action.payload
    })
  } catch (error) {
    console.log('Event code check error', error);
  }
}

function* createEventSaga() {
  yield takeLatest('SAGA/CREATE_EVENT', createEvent);
}

export default createEventSaga;