import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* remindersSaga() {
    yield takeEvery('SAGA/CREATE_REMINDERS', createReminders);
}

function* createReminders(action) {
    try{
        const reminders = action.payload;

        const response = yield axios({
            method:'POST',
            url:'/reminders',
            data: reminders
        });
    } catch (error) {
        console.log('createReminders SAGA function failed', error)
    }
}

export default remindersSaga;