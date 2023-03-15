import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteOneEventSaga() {
    yield takeEvery('SAGA/DELETE_ONE_EVENT', deleteOneEvent)
}

function* deleteOneEvent(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url:`/api/events/${action.payload}`
        })
        yield put({
            type:'DELETED',
            payload: 'deleted event'  
        })
    } catch(error) {
        console.log('deleteOneEvent SAGA function failed', error)
    }
}

export default deleteOneEventSaga;