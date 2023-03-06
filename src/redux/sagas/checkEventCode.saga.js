import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* checkEventCode(action) {
  try {
    const eventCodeToCheck = action.payload
    const response = yield axios({
        method: 'POST',
        url: '/api/checkEventCode',
        data: { eventCodeToCheck }
    })

    yield put({ type: 'IS_EVENT_CODE_UNIQUE', payload: response.data });
  } catch (error) {
    console.log('Event code check error', error);
  }
}

function* EventCodeCheckSaga() {
  yield takeLatest('SAGA/CHECK_EVENT_CODE', checkEventCode);
}

export default EventCodeCheckSaga;
