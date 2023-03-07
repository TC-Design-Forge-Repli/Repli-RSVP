import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* communicationOptionsSaga() {
    yield takeEvery('SAGA/CREATE_COMMUNICATION_OPTIONS', createCommunicationOptions);
}

function* createCommunicationOptions(action) {
    try{
        const communicationOptions = action.payload;

        const response = yield axios({
            method:'POST',
            url:'/communicationOptions',
            data: communicationOptions
        });
    } catch (error) {
        console.log('createCommunicationOptions SAGA function failed', error)
    }
}

export default communicationOptionsSaga;