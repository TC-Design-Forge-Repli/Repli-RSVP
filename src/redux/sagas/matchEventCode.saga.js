import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* matchEventCode(action) {
  try {
    const eventCodeToMatch = action.payload
    const response = yield axios({
        method: 'POST',
        url: '/api/checkEventCode/match',
        data: { eventCodeToMatch }
    })
    yield put({
        type: 'DOES_EVENT_CODE_MATCH',
        payload: response.data
    });
  } catch (error) {
    console.log('Event code check error', error);
  }
}

function* MatchEventCodeSaga() {
  yield takeLatest('SAGA/MATCH_EVENT_CODE', matchEventCode);
}

export default MatchEventCodeSaga;