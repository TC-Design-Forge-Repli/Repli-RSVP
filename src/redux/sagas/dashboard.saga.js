import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* dashboardSaga() {
    yield takeEvery('SAGA/FETCH_ALL_DATA', fetchDashboardData)
}


// Will get Party Names to be listed on the Party Names page
function* fetchDashboardData() {
    try {
        const response = yield axios({
            method: 'GET',
            url:`/api/events`
        })
        yield put({
            type:'SET_DASHBOARD',
            payload: response.data,
            
        })
    } catch(error) {
        console.log('fetchDashboard SAGA function failed', error)
    }
}

export default dashboardSaga;