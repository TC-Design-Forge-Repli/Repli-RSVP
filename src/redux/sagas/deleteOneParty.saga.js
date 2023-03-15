// SAGA/DELETE_ONE_PARTY
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteOnePartySaga() {
    yield takeEvery('SAGA/DELETE_ONE_PARTY', deleteOneParty)
}


function* deleteOneParty(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url:`/api/partyNames/${action.payload}`
        })
        yield put({
            type:'DELETED',
            payload: 'deleted party'
        })
    } catch(error) {
        console.log('deleteOneParty SAGA function failed', error)
    }
}

export default deleteOnePartySaga;