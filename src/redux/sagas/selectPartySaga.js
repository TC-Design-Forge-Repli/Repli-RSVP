import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* selectPartySaga() {
    yield takeEvery('SAGA/FETCH_PARTY_NAMES', fetchPartyNames)
}


// Will get Party Names to be listed on the Party Names page
function* fetchPartyNames() {
    try {
        const response = yield axios({
            method: 'GET',
            url:`/api/partyNames`
        })
        yield put({
            type:'SET_PARTY_NAMES',
            payload: response.data,
            
        })
        console.log(response.data)
    } catch(error) {
        console.log('fetchPartyNames SAGA function failed', error)
    }
}

export default selectPartySaga;